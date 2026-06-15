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
    float petal = 0.66 + 0.14 * cos(sa * 3 + t * 1.28 + ph);
    v = sin((sr - petal) * 10.72);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	p += vec2(0.46, 0.49) * sin(length(p) * 5.17 - time * 0.65) * 0.26;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.70, lr * 1.73 + time * 0.42); }
	p = rot2(time * -0.78) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.09, vec3(0.50, 0.59, 0.53), vec3(0.44, 0.47, 0.41), vec3(0.81, 1.03, 1.22), vec3(0.01, 0.72, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
