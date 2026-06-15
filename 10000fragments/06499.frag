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
    float petal = 0.70 + 0.29 * cos(sa * 7 + t * 0.46 + ph);
    v = sin((sr - petal) * 7.40);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.09, lr * 2.10 + time * -0.50); }
	{ float fr = length(p); p *= 1.0 + 0.70 * fr * fr; }
	p = rot2(length(p) * -3.63 + time * 1.03) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.10, vec3(0.55, 0.56, 0.41), vec3(0.42, 0.32, 0.47), vec3(1.20, 0.72, 0.89), vec3(0.49, 0.35, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
