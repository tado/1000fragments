uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.20, 0.0)) * 11.53 - t * 3.85 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 35.42 - t * 1.01 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.44 - t * 1.96 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 6.56 * sin(t * 1.00) + t * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 2.57 + time * 2.55) * 0.28;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.21; q1 = rot2(0.88) * q1; }
	q2 = sin(q2 * 1.59 + time * 0.90) * 0.66;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.05);
	float d3 = fieldC(q3, time, 0.55);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.19, 0.93, 0.39) * (0.17 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
