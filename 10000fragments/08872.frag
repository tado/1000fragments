uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.86 + sin(p.y * 2.79 + t * 1.23) * 2.90 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.12) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.36 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.34) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 2.51 * p.y + time * 0.68); p.y += 0.28 / wf * cos(wf * 3.46 * p.x + time * 0.90); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.72);
	float d = d1 + d2;
	vec3 col = palette(d * 1.58 + time * 0.10, vec3(0.50, 0.47, 0.52), vec3(0.39, 0.37, 0.50), vec3(1.13, 1.10, 0.97), vec3(0.19, 0.80, 0.90));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
