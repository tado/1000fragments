uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.71;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.42; kp = rot2(2.28) * kp; kp *= 1.30; }
    v = sin(kp.x * 2.42 - t * 3.29 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 2.96 * sin(t * 1.31) + t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.71;
	p = (floor(p * 17.5) + 0.5) / 17.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.05 + time * 0.07, vec3(0.45, 0.51, 0.43), vec3(0.48, 0.42, 0.46), vec3(1.07, 1.15, 1.38), vec3(0.62, 0.74, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
