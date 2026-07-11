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
    float petal = 0.50 + 0.29 * cos(sa * 4 + t * 1.99 + ph);
    v = sin((sr - petal) * 8.77);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.94 + vec2(t * 1.95, -t * 1.95) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	p = rot2(time * -0.54) * p;
	{ p = vec2(atan(p.y, p.x) * 1.16, length(p) * 5.47 - time * 0.80); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.86);
	float d = d1 + d2;
	vec3 col = palette(d * 0.88 + time * 0.16, vec3(0.48, 0.59, 0.47), vec3(0.48, 0.35, 0.39), vec3(0.88, 1.40, 0.73), vec3(0.45, 0.20, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
