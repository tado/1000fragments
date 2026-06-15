uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.41 + vec2(t * 1.24, -t * 1.24) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.08 + sin(p.y * 2.15 + t * 1.59) * 2.44 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.12 * p.y + time * 1.86); p.y += 0.33 / wf * cos(wf * 2.34 * p.x + time * 0.93); }
	p += vec2(0.44, -0.65) * sin(length(p) * 3.66 - time * 0.58) * 0.40;
	p *= 2.97;
	p = abs(p) - 0.65;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = d1 + d2;
	vec3 col = palette(d * 0.77 + time * 0.17, vec3(0.53, 0.56, 0.50), vec3(0.44, 0.37, 0.31), vec3(0.91, 1.10, 0.99), vec3(0.75, 0.53, 0.87));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
