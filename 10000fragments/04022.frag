uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.79) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 1.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.61 * p.y + time * 1.90); p.y += 0.47 / wf * cos(wf * 2.69 * p.x + time * 1.17); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.25, vec3(0.59, 0.41, 0.59), vec3(0.35, 0.46, 0.46), vec3(0.94, 0.90, 1.21), vec3(0.05, 0.08, 0.75));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
