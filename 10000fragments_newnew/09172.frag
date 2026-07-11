uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.60, 0.0)) * 10.29 - t * 3.63 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 18.62 - t * 1.15 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.54 + vec2(t * 2.95, -t * 2.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.12 + t * 4.31 + ph) + sin(p.y * 15.35 - t * 5.25 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -1.10 + time * 0.37) * q1;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.50; q2 = rot2(1.11) * q2; }
	q2 = fract(q2 * 1.34) - 0.5;
	q3 = rot2(q3.y * -2.41 + time * 1.07) * q3;
	q3 = rot2(1.41) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d3 = fieldC(q3, time, 0.04);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.75 + time * 0.45);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
