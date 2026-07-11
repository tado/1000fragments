uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.27 + sin(p.y * 4.75 + t * 5.44) * 1.54 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.48;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.76; kp = rot2(2.24) * kp; kp *= 1.19; }
    v = sin(kp.x * 2.66 - t * 1.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	p += vec2(-0.33, -0.27) * sin(length(p) * 4.24 - time * 2.05) * 0.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.01 + time * 0.10, vec3(0.57, 0.43, 0.51), vec3(0.40, 0.38, 0.43), vec3(0.95, 1.28, 0.75), vec3(0.91, 0.99, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
