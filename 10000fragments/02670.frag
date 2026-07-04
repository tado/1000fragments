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
    float petal = 0.67 + 0.25 * cos(sa * 8.0 + t * 1.47 + ph);
    v = sin((sr - petal) * 10.77);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.55 - t * 0.69;
    v = sin(floor(lv * 2.3) / 2.3 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.49) * p;
	p *= 3.09;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = d1 + d2;
	vec3 col = palette(d * 1.15 + time * 0.10, vec3(0.50, 0.48, 0.58), vec3(0.46, 0.32, 0.41), vec3(1.17, 1.35, 0.93), vec3(0.23, 0.29, 0.58));
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
