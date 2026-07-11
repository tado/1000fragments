uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.94 + sin(p.y * 2.15 + t * 2.66) * 2.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.06 * p.y + time * 0.85); p.y += 0.36 / wf * cos(wf * 3.30 * p.x + time * 0.82); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(2.41) * p; }
	p = abs(p) - 0.62;
	p = rot2(1.30) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.73 + time * 0.08, vec3(0.43, 0.45, 0.53), vec3(0.42, 0.49, 0.47), vec3(0.71, 1.03, 0.80), vec3(0.38, 0.88, 0.42));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
