uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.54 + vec2(t * 1.47, -t * 2.46) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.48 * p.y + time * 1.10); p.y += 0.28 / wf * cos(wf * 2.43 * p.x + time * 1.61); }
	p = abs(p) - 0.63;
	p = rot2(1.16) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.98, 0.84, 0.74) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 3.00 + time * 14.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
