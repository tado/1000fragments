uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.03 + sin(p.y * 2.94 + t * 5.67) * 4.26 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.38;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.57; kp = rot2(0.70) * kp; kp *= 1.30; }
    v = sin(kp.y * 3.10 - t * 4.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.72;
	p = rot2(time * -1.58) * p;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	p += vec2(-0.99, 0.32) * sin(length(p) * 4.33 - time * 0.81) * 0.14;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = d1 + d2;
	vec3 col = palette(d * 0.96 + time * 0.14, vec3(0.60, 0.51, 0.50), vec3(0.50, 0.46, 0.44), vec3(1.30, 1.16, 0.72), vec3(0.91, 0.55, 0.02));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
