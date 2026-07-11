uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.43;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.60; kp = rot2(1.51) * kp; kp *= 1.34; }
    v = sin(kp.y * 3.33 - t * 3.37 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.91 + sin(p.y * 2.90 + t * 4.72) * 4.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = d1 * d2;
	vec3 col = palette(d * 1.41 + time * 0.28, vec3(0.54, 0.60, 0.40), vec3(0.33, 0.38, 0.45), vec3(1.13, 0.81, 0.75), vec3(0.71, 0.82, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
