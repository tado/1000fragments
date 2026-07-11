uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.22 + vec2(t * 1.73, -t * 1.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.46 * p.y + time * 1.34); p.y += 0.38 / wf * cos(wf * 2.42 * p.x + time * 1.26); }
	p = fract(p * 1.23) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.11, vec3(0.52, 0.60, 0.46), vec3(0.43, 0.43, 0.41), vec3(1.31, 0.78, 1.23), vec3(0.11, 0.25, 0.57));
	col = clamp((col - 0.5) * 1.89 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
