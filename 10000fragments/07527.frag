uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.65 + t * 1.12 + ph) + sin(p.y * 4.75 - t * 1.12 + ph)
        + sin((p.x + p.y) * 7.50 + t * 1.12 + ph) + sin(length(p) * 5.71 - t * 1.12 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.34 + vec2(t * 1.80, -t * 1.80) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.66 * p.y + time * 0.86); p.y += 0.30 / wf * cos(wf * 2.47 * p.x + time * 1.32); }
	p = rot2(time * 0.31) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.88);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.01 + time * 0.08, vec3(0.53, 0.54, 0.45), vec3(0.38, 0.46, 0.45), vec3(1.03, 0.99, 0.71), vec3(0.56, 0.59, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
