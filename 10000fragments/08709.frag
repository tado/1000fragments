uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.80 + sin(p.y * 4.25 + t * 4.37) * 3.68 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.85) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 0.88 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 5.00 - time * 0.22); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.06 * p.y + time * 0.61); p.y += 0.22 / wf * cos(wf * 2.52 * p.x + time * 0.66); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.65 + time * 0.18, vec3(0.50, 0.58, 0.46), vec3(0.38, 0.47, 0.50), vec3(1.34, 0.71, 1.22), vec3(0.67, 0.16, 0.54));
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
