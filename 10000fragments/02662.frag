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
    float petal = 0.66 + 0.26 * cos(sa * 5 + t * 1.75 + ph);
    v = sin((sr - petal) * 8.47);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.44, length(p) * 4.07 - time * 0.37); }
	p = rot2(time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.25, vec3(0.51, 0.47, 0.60), vec3(0.35, 0.38, 0.43), vec3(0.98, 0.95, 0.74), vec3(0.02, 0.02, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
