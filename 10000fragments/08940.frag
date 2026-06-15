uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.84) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.41 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	p = fract(p * 1.06) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 1.74 + time * -0.53); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.37 * p.y + time * 0.88); p.y += 0.27 / wf * cos(wf * 3.57 * p.x + time * 0.71); }
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 4.03 - time * 0.34); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.24, vec3(0.59, 0.56, 0.52), vec3(0.35, 0.44, 0.33), vec3(1.03, 0.87, 1.10), vec3(0.53, 0.45, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
