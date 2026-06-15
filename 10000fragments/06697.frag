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
    float petal = 0.62 + 0.21 * cos(sa * 5 + t * 2.08 + ph);
    v = sin((sr - petal) * 7.03);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.49;
	p = rot2(2.25) * p;
	p = rot2(time * -0.64) * p;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.05, vec3(0.60, 0.50, 0.48), vec3(0.34, 0.45, 0.46), vec3(1.10, 1.15, 0.77), vec3(0.25, 0.99, 0.41));
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
