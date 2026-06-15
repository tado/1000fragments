uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.52) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.28 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.72;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.22 * p.y + time * 1.93); p.y += 0.49 / wf * cos(wf * 2.32 * p.x + time * 1.19); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(0.34) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.22, vec3(0.59, 0.50, 0.41), vec3(0.46, 0.38, 0.47), vec3(1.14, 0.87, 0.71), vec3(0.25, 0.60, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
