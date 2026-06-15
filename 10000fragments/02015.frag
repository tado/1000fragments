uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.60 + t * 4.07 + ph) + sin(p.y * 8.32 - t * 4.07 + ph)
        + sin((p.x + p.y) * 10.66 + t * 4.07 + ph) + sin(length(p) * 6.90 - t * 4.07 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.75 + vec2(t * 2.91, -t * 2.91) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.75 * p.y + time * 0.76); p.y += 0.50 / wf * cos(wf * 1.65 * p.x + time * 1.25); }
	p += vec2(0.81, -0.13) * sin(length(p) * 4.47 - time * 1.90) * 0.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = d1 * d2;
	vec3 col = palette(d * 0.82 + time * 0.18, vec3(0.47, 0.56, 0.46), vec3(0.43, 0.37, 0.36), vec3(0.97, 1.05, 1.06), vec3(0.97, 0.97, 0.74));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
