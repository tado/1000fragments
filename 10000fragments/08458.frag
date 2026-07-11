uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.95) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 1.03 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.28 * sin(mf + 3.0) + ph), cos(t * 2.28 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.63 * p.y + time * 1.98); p.y += 0.26 / wf * cos(wf * 3.58 * p.x + time * 0.80); }
	p *= 3.42;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.43 + time * 0.25, vec3(0.44, 0.52, 0.48), vec3(0.39, 0.35, 0.35), vec3(1.29, 0.86, 1.09), vec3(0.18, 0.50, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
