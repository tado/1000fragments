uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.70 + t * 5.44 + ph) + sin(p.y * 15.45 - t * 0.92 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.10 * cos(sa * 3.0 + t * 0.64 + ph);
    v = sin((sr - petal) * 14.74);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	p = rot2(length(p) * -1.44 + time * 1.12) * p;
	p = rot2(p.y * -2.75 + time * 0.43) * p;
	{ p = vec2(atan(p.y, p.x) * 2.94, length(p) * 4.40 - time * 0.28); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = d1 * d2;
	vec3 col = palette(d * 0.56 + time * 0.13, vec3(0.47, 0.50, 0.45), vec3(0.34, 0.39, 0.31), vec3(1.29, 1.09, 0.89), vec3(0.71, 0.29, 0.46));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.58 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
