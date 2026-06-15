uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.55 - t * 6.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.17;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.38 * p.y + time * 0.93); p.y += 0.21 / wf * cos(wf * 3.52 * p.x + time * 0.95); }
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 3.93 - time * 0.14); }
	p = rot2(length(p) * 3.65 + time * 0.90) * p;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.77 + time * 0.12);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
