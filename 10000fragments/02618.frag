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
    float petal = 0.48 + 0.20 * cos(sa * 5 + t * 2.77 + ph);
    v = sin((sr - petal) * 18.78);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	p = rot2(time * 0.79) * p;
	p = rot2(p.y * -1.31 + time * 0.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.13, vec3(0.52, 0.51, 0.56), vec3(0.47, 0.33, 0.50), vec3(1.19, 1.19, 1.14), vec3(0.65, 0.40, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
