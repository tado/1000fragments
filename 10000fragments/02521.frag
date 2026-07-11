uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.15 + vec2(t * 1.32, -t * 1.32) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.27 * cos(sa * 3 + t * 2.76 + ph);
    v = sin((sr - petal) * 8.13);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	p += vec2(-0.91, -0.43) * sin(length(p) * 2.82 - time * 1.11) * 0.20;
	p = rot2(2.22) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.21);
	float d = d1 * d2;
	vec3 col = palette(d * 1.14 + time * 0.14, vec3(0.55, 0.54, 0.51), vec3(0.34, 0.47, 0.37), vec3(1.03, 1.23, 1.16), vec3(0.49, 0.11, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
