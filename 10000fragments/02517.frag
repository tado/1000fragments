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
    float petal = 0.53 + 0.13 * cos(sa * 3 + t * 0.82 + ph);
    v = sin((sr - petal) * 10.02);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.68) * p;
	p = rot2(length(p) * -1.37 + time * 0.30) * p;
	p = fract(p * 2.60) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.16, vec3(0.42, 0.48, 0.59), vec3(0.35, 0.46, 0.37), vec3(1.11, 0.88, 1.00), vec3(0.02, 0.58, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
