uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.20 + t * 0.49) - 0.5) * 2.0;
    v = sin((p.y * 5.84 + zx * 0.80 + t * 2.40) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.86;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.65) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 0.85) * sin(6.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 2.02 * sin(t * 0.62) + t * 3.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.93;
	q1 = rot2(2.26) * q1;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3.y += sin(q3.x * 6.92 + time * 1.81) * 0.31;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d3 = fieldC(q3, time, 0.51);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.05 + time * 0.06, vec3(0.53, 0.53, 0.43), vec3(0.44, 0.44, 0.41), vec3(1.26, 1.37, 0.79), vec3(0.50, 0.09, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
