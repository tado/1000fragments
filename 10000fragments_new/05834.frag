uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.14 * cos(sa * 6.0 + t * 0.67 + ph);
    v = sin((sr - petal) * 13.77);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.59;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.71; kp = rot2(1.62) * kp; kp *= 1.39; }
    v = sin(kp.y * 1.00 - t * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.92 + time * 0.19, vec3(0.46, 0.43, 0.45), vec3(0.47, 0.33, 0.32), vec3(0.71, 1.33, 1.32), vec3(0.85, 0.74, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
