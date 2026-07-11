uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 12.35 - t * 1.48 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 32.29 - t * 5.03 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.55 * jf)) * 0.63;
        xs += sin(length(p - im) * 98.19 - t * 4.45 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.37 + t * 1.18 + ph) + sin(p.y * 9.14 - t * 1.18 + ph)
        + sin((p.x + p.y) * 7.85 + t * 1.18 + ph) + sin(length(p) * 9.40 - t * 1.18 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.41; q1 = rot2(2.53) * q1; }
	q1 *= 2.33;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.43 / wf * sin(wf * 3.52 * q2.y + time * 0.71); q2.y += 0.23 / wf * cos(wf * 3.87 * q2.x + time * 1.30); }
	q3 = (floor(q3 * 8.7) + 0.5) / 8.7;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d3 = fieldC(q3, time, 0.18);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.89, 0.98, 0.20) * (0.21 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
