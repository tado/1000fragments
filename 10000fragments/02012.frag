uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.29 * pow(abs(cos(ra * 4.0 + t * 0.56)), 1.05);
    v = sin((rr - pet) * 8.51 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.93;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.40; kp = rot2(1.47) * kp; kp *= 1.37; }
    v = sin(kp.y * 3.32 - t * 1.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.16));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.33);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.80, 0.73, 0.52) * (0.08 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
