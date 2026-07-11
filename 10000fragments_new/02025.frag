uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.79 + vec2(t * 1.38, -t * 1.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.24;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.44; kp = rot2(1.11) * kp; kp *= 1.21; }
    v = sin(kp.y * 1.97 - t * 1.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.90;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d = d1 * d2;
	vec3 col = palette(d * 0.67 + time * 0.20, vec3(0.41, 0.56, 0.52), vec3(0.45, 0.43, 0.45), vec3(0.85, 1.25, 1.03), vec3(0.83, 0.63, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
