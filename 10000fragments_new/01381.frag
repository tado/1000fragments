uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.39 + t * 1.41 + ph) + sin(p.y * 5.39 - t * 3.65 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	p = rot2(length(p) * -1.36 + time * 0.34) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.42, lr * 2.14 + time * -0.21); }
	p += vec2(0.70, -0.95) * sin(length(p) * 4.77 - time * 0.80) * 0.15;
	p.x += sin(p.y * 6.33 + time * 3.06) * 0.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.07, vec3(0.47, 0.51, 0.45), vec3(0.45, 0.40, 0.43), vec3(0.80, 1.26, 1.25), vec3(0.11, 0.80, 0.21));
	col = mod(col * 2.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
