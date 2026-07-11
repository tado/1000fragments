uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.87 + vec2(t * 2.84, -t * 2.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 1.70 * p.y + time * 1.35); p.y += 0.36 / wf * cos(wf * 1.78 * p.x + time * 1.21); }
	p = fract(p * 2.90) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.30, vec3(0.49, 0.52, 0.57), vec3(0.30, 0.50, 0.47), vec3(1.25, 0.92, 1.26), vec3(0.90, 0.25, 0.35));
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
