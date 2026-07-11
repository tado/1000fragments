uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.31 + sr * 4.12 - t * 1.49 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.80 + t * 2.81 + ph) + sin(p.y * 3.09 - t * 1.21 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 7.06 * sin(t * 1.08) + t * 1.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.74;
	q2 = rot2(length(q2) * 3.00 + time * 1.17) * q2;
	q3 += vec2(0.84, 0.99) * sin(length(q3) * 5.22 - time * 1.39) * 0.17;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d3 = fieldC(q3, time, 0.47);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.11, 1.28, 1.44) + vec3(0.20, 0.23, 0.24);
	col = fract(col * 1.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
