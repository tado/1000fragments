uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.96 + sin(p.y * 3.64 + t * 2.85) * 4.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 5.90 * sin(t * 1.47) + t * 1.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.31 / wf * sin(wf * 2.34 * q1.y + time * 2.05); q1.y += 0.28 / wf * cos(wf * 2.12 * q1.x + time * 2.17); }
	q2 *= 1.30;
	q2 = rot2(length(q2) * 3.64 + time * 0.55) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.63 + time * 0.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
