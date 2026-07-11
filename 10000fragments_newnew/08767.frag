uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.42 - t * 0.42;
    v = sin(floor(lv * 3.6) / 3.6 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.50 + t * 0.80 + ph) + sin(p.y * 5.00 - t * 2.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 11.9) + 0.5) / 11.9;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.43, lr * 2.48 + time * -0.37); }
	q2 = rot2(time * 1.03) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.71);
	float d = max(d1, d2);
	vec3 col = vec3(0.46, 0.15, 0.55) * (0.16 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
