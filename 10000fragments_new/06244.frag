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
    float grow = floor(p.y * 11.65);
    float gsh = hash21(vec2(grow, floor(t * 2.35))) - 0.5;
    float gx = p.x + gsh * 1.18;
    v = sin(gx * 10.01 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.15));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.35;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.50; kp = rot2(0.83) * kp; kp *= 1.20; }
    v = sin(kp.y * 2.75 - t * 3.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	p = rot2(time * 1.34) * p;
	p = fract(p * 1.02) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.49, length(p) * 4.76 - time * 0.72); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.47; p = rot2(2.23) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.66);
	float d = d1 * d2;
	vec3 col = palette(d * 1.47 + time * 0.06, vec3(0.58, 0.54, 0.44), vec3(0.39, 0.38, 0.36), vec3(0.70, 0.90, 1.24), vec3(0.93, 0.67, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
