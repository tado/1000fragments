uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.67 - t * 0.70;
    v = sin(floor(lv * 3.6) / 3.6 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.85;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.99) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.90) * sin(3.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.55 + vec2(t * 1.65, -t * 2.81) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(1.65) * q2;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.24; q2 = rot2(0.53) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.13);
	float d3 = fieldC(q3, time, 1.94);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.52 + time * 0.54);
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
