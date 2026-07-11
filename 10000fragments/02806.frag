uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.11 + vec2(t * 2.92, -t * 2.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.11) * p;
	p = abs(p);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 1.81 * p.y + time * 1.24); p.y += 0.33 / wf * cos(wf * 3.32 * p.x + time * 0.61); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.72));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
