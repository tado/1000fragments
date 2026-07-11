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
    float petal = 0.52 + 0.26 * cos(sa * 6 + t * 0.69 + ph);
    v = sin((sr - petal) * 9.38);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 3.36 + time * 0.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.23, vec3(0.41, 0.57, 0.51), vec3(0.37, 0.37, 0.34), vec3(0.73, 1.29, 1.24), vec3(0.81, 0.11, 0.68));
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
