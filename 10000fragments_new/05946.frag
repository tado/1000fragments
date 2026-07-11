uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.13 + t * 4.59 + ph) + sin(p.y * 13.50 - t * 4.59 + ph)
        + sin((p.x + p.y) * 4.46 + t * 4.59 + ph) + sin(length(p) * 15.51 - t * 4.59 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 6.63 * sin(t * 0.58) + t * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.75, lr * 1.47 + time * -0.29); }
	q1 = rot2(length(q1) * -2.66 + time * 1.33) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.88);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.55 + time * 0.22);
	col = fract(col * 2.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
