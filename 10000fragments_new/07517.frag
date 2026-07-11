uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 4.83 * sin(t * 1.25) + t * 4.80 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.26 * cos(sa * 8.0 + t * 1.57 + ph);
    v = sin((sr - petal) * 19.82);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -1.99 + time * 1.42) * q1;
	q2 = (floor(q2 * 7.1) + 0.5) / 7.1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.84 + time * 0.57);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.39 + time * 10.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
