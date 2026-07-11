uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.02 + t * 3.57 + ph) * 0.7;
    float wb = sin(p.y * 5.88 - t * 1.77 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.30;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.23 + t * 2.26 + ph) + sin(p.y * 3.47 - t * 2.26 + ph)
        + sin((p.x + p.y) * 9.91 + t * 2.26 + ph) + sin(length(p) * 8.43 - t * 2.26 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.09 + time * 0.45) * q1;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.27 / wf * sin(wf * 3.81 * q1.y + time * 1.59); q1.y += 0.25 / wf * cos(wf * 3.02 * q1.x + time * 0.60); }
	q2 += vec2(-0.83, -0.58) * sin(length(q2) * 4.45 - time * 2.21) * 0.16;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.23; q2 = rot2(1.41) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.94 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
