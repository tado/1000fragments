uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.99 + vec2(t * 0.59, -t * 0.59) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.37 + t * 1.47 + ph) + sin(p.y * 3.04 - t * 1.47 + ph)
        + sin((p.x + p.y) * 4.43 + t * 1.47 + ph) + sin(length(p) * 4.00 - t * 1.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 2.72 * p.y + time * 1.53); p.y += 0.26 / wf * cos(wf * 1.75 * p.x + time * 1.73); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = d1 * d2;
	vec3 col = palette(d * 0.66 + time * 0.05, vec3(0.41, 0.42, 0.56), vec3(0.46, 0.35, 0.40), vec3(0.80, 0.82, 0.77), vec3(0.68, 0.48, 0.23));
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
