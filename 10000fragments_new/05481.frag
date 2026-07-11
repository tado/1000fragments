uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.68;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.50; kp = rot2(1.36) * kp; kp *= 1.26; }
    v = sin(kp.y * 1.23 - t * 1.33 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.94 + vec2(t * 2.36, -t * 2.19) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.10;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.31, length(q1) * 5.21 - time * 0.93); }
	q2 = rot2(length(q2) * -3.37 + time * 0.33) * q2;
	q2 = rot2(0.59) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.32 + time * 0.14);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
