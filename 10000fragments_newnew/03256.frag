uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.55;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.51; kp = rot2(1.56) * kp; kp *= 1.27; }
    v = sin(kp.x * 1.24 - t * 3.01 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 4.78 * sin(t * 0.70) + t * 1.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.90;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.0 + 0.22 * sin(time * 3.16);
	q2 = rot2(length(q2) * 1.11 + time * 0.54) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.80);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.32, 0.22), vec3(0.88, 0.60, 0.82), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
