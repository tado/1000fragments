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
    float petal = 0.54 + 0.26 * cos(sa * 7 + t * 0.73 + ph);
    v = sin((sr - petal) * 13.70);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.99 - t * 5.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 2.97 - time * 0.33); }
	p = rot2(length(p) * -2.83 + time * 0.22) * p;
	p = rot2(p.y * -2.11 + time * 0.96) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.55 + time * 0.26, vec3(0.52, 0.56, 0.55), vec3(0.40, 0.39, 0.33), vec3(1.39, 1.10, 0.86), vec3(0.02, 0.78, 0.49));
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
