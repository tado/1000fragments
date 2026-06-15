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
    float petal = 0.35 + 0.21 * cos(sa * 7 + t * 0.50 + ph);
    v = sin((sr - petal) * 14.55);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.34 + t * 5.89 + ph) + sin(p.y * 8.31 - t * 1.20 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -1.07 + time * 0.33) * p;
	p += vec2(0.26, -0.61) * sin(length(p) * 4.11 - time * 1.96) * 0.30;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.80, lr * 1.88 + time * -0.14); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.57);
	float d = d1 + d2;
	vec3 col = palette(d * 1.62 + time * 0.07, vec3(0.48, 0.43, 0.48), vec3(0.48, 0.40, 0.45), vec3(0.74, 1.27, 1.28), vec3(0.35, 0.41, 0.43));
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
