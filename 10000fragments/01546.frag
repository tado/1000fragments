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
    float petal = 0.49 + 0.23 * cos(sa * 9 + t * 1.72 + ph);
    v = sin((sr - petal) * 17.96);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.11 + t * 4.92 + ph) + sin(p.y * 10.42 - t * 5.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	p = rot2(time * -0.46) * p;
	p = fract(p * 1.98) - 0.5;
	p += vec2(0.13, -0.62) * sin(length(p) * 2.71 - time * 1.60) * 0.37;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.66);
	float d = d1 + d2;
	vec3 col = palette(d * 1.48 + time * 0.28, vec3(0.49, 0.42, 0.59), vec3(0.45, 0.37, 0.38), vec3(1.12, 1.30, 0.99), vec3(0.13, 0.79, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
