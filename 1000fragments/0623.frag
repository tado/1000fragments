uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.83 + vec2(t * 1.63, -t * 1.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 1.86 * p.y + time * 0.82); p.y += 0.23 / wf * cos(wf * 2.27 * p.x + time * 1.00); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.06, vec3(0.49, 0.43, 0.41), vec3(0.46, 0.36, 0.48), vec3(1.37, 1.31, 0.92), vec3(0.29, 0.75, 0.19));
	col = fract(col * 2.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
