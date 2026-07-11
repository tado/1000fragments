uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.04;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.77; kp = rot2(1.97) * kp; kp *= 1.44; }
    v = sin(kp.y * 2.29 - t * 2.42 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.64 + t * 1.78 + ph) + sin(p.y * 6.93 - t * 1.78 + ph)
        + sin((p.x + p.y) * 7.53 + t * 1.78 + ph) + sin(length(p) * 11.54 - t * 1.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 23.1) + 0.5) / 23.1;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.21, lr * 2.14 + time * -0.98); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.59);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.22 + time * 0.26, vec3(0.56, 0.44, 0.43), vec3(0.44, 0.37, 0.32), vec3(1.33, 0.91, 1.27), vec3(0.56, 0.88, 0.01));
	col = mod(col * 2.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
