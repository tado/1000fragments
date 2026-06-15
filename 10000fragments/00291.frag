uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.18 + vec2(t * 2.85, -t * 2.85) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.50) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.52 * p.y + time * 1.05); p.y += 0.31 / wf * cos(wf * 3.56 * p.x + time * 0.99); }
	p = rot2(p.y * -1.56 + time * 0.51) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.27, 0.53), vec3(0.67, 0.80, 0.84), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
