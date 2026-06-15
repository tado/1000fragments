uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.32 + sin(p.y * 2.07 + t * 5.29) * 3.98 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.18 * cos(sa * 7 + t * 2.20 + ph);
    v = sin((sr - petal) * 9.47);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	p *= 2.77;
	p = rot2(time * 1.03) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.21 + time * 0.22, vec3(0.57, 0.53, 0.44), vec3(0.39, 0.44, 0.42), vec3(0.95, 1.04, 1.31), vec3(0.88, 0.11, 0.39));
	col = fract(col * 1.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
