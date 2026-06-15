uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.10 + vec2(t * 2.00, -t * 2.00) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.57 + sin(p.y * 3.38 + t * 5.39) * 3.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.82 * p.y + time * 1.07); p.y += 0.23 / wf * cos(wf * 1.84 * p.x + time * 1.94); }
	p *= 3.43;
	p = fract(p * 1.47) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.12 + time * 0.20, vec3(0.43, 0.40, 0.50), vec3(0.33, 0.39, 0.41), vec3(1.32, 0.79, 1.14), vec3(0.20, 0.39, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
