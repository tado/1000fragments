uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.47;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.58; kp = rot2(1.05) * kp; kp *= 1.41; }
    v = sin(kp.y * 3.42 - t * 1.39 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 9.00) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 2.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 1.32 + time * 0.69); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.15;
	p = abs(p);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.51; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = d1 + d2;
	vec3 col = palette(d * 0.84 + time * 0.14, vec3(0.52, 0.49, 0.46), vec3(0.32, 0.48, 0.36), vec3(1.19, 0.72, 1.05), vec3(0.36, 0.98, 0.31));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
