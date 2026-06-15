uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.05) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.08 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.20; p = rot2(2.50) * p; }
	p = rot2(2.98) * p;
	p = rot2(time * -0.99) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.71 * p.y + time * 1.84); p.y += 0.47 / wf * cos(wf * 2.85 * p.x + time * 1.21); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.22, vec3(0.55, 0.50, 0.50), vec3(0.38, 0.33, 0.35), vec3(0.95, 1.07, 1.06), vec3(0.31, 0.59, 0.40));
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
