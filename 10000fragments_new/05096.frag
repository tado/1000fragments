uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.81 - t * 7.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.08 + vec2(t * 1.33, -t * 1.15) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.59) * q1;
	q1 = rot2(3.08) * q1;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.22 / wf * sin(wf * 3.94 * q2.y + time * 1.72); q2.y += 0.27 / wf * cos(wf * 2.87 * q2.x + time * 1.14); }
	q2 = rot2(length(q2) * -2.73 + time * 0.89) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.75);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.52 + time * 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
