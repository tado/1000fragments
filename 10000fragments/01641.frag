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
    float petal = 0.39 + 0.18 * cos(sa * 6 + t * 2.34 + ph);
    v = sin((sr - petal) * 18.31);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.15) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.11, vec3(0.54, 0.52, 0.44), vec3(0.35, 0.49, 0.34), vec3(0.80, 1.13, 0.92), vec3(0.82, 0.40, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
