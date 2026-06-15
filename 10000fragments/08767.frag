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
    float petal = 0.46 + 0.24 * cos(sa * 6 + t * 0.83 + ph);
    v = sin((sr - petal) * 14.97);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	p = rot2(length(p) * 3.10 + time * 0.34) * p;
	p = rot2(1.61) * p;
	p += vec2(0.59, 0.03) * sin(length(p) * 4.75 - time * 1.01) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.07, vec3(0.51, 0.52, 0.41), vec3(0.46, 0.50, 0.39), vec3(0.93, 1.27, 1.38), vec3(0.90, 0.19, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
