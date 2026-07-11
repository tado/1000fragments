uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.61;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.76; kp = rot2(0.32) * kp; kp *= 1.39; }
    v = sin(kp.y * 3.39 - t * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 2.20 + time * 0.74); }
	p *= 1.0 + 0.11 * sin(time * 1.63);
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 2.28 - time * 0.66); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.05, vec3(0.55, 0.54, 0.58), vec3(0.44, 0.37, 0.30), vec3(0.95, 1.14, 1.26), vec3(0.51, 0.09, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
