uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 18.35 - t * 6.68 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 30.17 - t * 6.68 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.75 * fr * fr; }
	p = rot2(length(p) * 1.48 + time * 0.38) * p;
	{ p = vec2(atan(p.y, p.x) * 2.61, length(p) * 2.91 - time * 0.18); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.58 * p.y + time * 1.76); p.y += 0.26 / wf * cos(wf * 1.73 * p.x + time * 1.22); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.99 + time * 0.10);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
