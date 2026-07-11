uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 22.42 - t * 5.66 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 37.33 - t * 5.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.30) * p;
	p *= 2.82;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.74 * p.y + time * 0.61); p.y += 0.30 / wf * cos(wf * 3.69 * p.x + time * 1.79); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.12 + time * 0.04);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
