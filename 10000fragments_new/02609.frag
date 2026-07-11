uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.05;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.58; kp = rot2(0.64) * kp; kp *= 1.44; }
    v = sin(kp.y * 2.73 - t * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(1.65) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.15, vec3(0.50, 0.54, 0.51), vec3(0.38, 0.30, 0.32), vec3(1.00, 0.76, 1.10), vec3(0.02, 0.47, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
