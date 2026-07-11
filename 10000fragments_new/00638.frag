uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 5.53 * sin(t * 0.46) + t * 4.30 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.80 + t * 2.09 + ph) * 0.7;
    float wb = sin(p.y * 11.98 - t * 1.86 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.10, lr * 1.43 + time * -0.47); }
	q1 *= 1.78;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.25; q2 = rot2(1.99) * q2; }
	q2 = rot2(length(q2) * 1.67 + time * 0.53) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.65);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.45, 0.63, 1.02) + vec3(0.09, 0.20, 0.02);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 2.36 + time * 13.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
