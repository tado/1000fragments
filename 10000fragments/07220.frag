uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.14 + jf * 4.0), cos(t * 0.43 * jf)) * 0.35;
        xs += sin(length(p - im) * 89.93 - t * 9.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.34 + vec2(t * 2.93, -t * 2.93) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.60 * p.y + time * 1.72); p.y += 0.27 / wf * cos(wf * 3.78 * p.x + time * 1.12); }
	p = abs(p) - 0.29;
	p += vec2(0.96, 0.10) * sin(length(p) * 2.39 - time * 1.89) * 0.39;
	p = fract(p * 2.77) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.19);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.92 + time * 0.02, vec3(0.57, 0.57, 0.44), vec3(0.36, 0.31, 0.46), vec3(1.23, 0.83, 0.75), vec3(0.46, 0.08, 0.57));
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
