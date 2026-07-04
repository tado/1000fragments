uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.68;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.56; kp = rot2(0.77) * kp; kp *= 1.25; }
    v = sin(kp.y * 3.84 - t * 4.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 5.98 * sin(t * 1.33) + t * 4.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.89) - 0.5;
	q2 *= 1.0 + 0.39 * sin(time * 1.80);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.60);
	float d = d1 * d2;
	vec3 col = palette(d * 1.43 + time * 0.13, vec3(0.45, 0.53, 0.58), vec3(0.48, 0.40, 0.46), vec3(0.77, 1.07, 1.00), vec3(0.55, 0.29, 0.38));
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
