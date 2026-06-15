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
    float petal = 0.68 + 0.17 * cos(sa * 7 + t * 2.89 + ph);
    v = sin((sr - petal) * 6.94);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	p = rot2(time * -0.89) * p;
	p = rot2(1.66) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.19, vec3(0.51, 0.54, 0.58), vec3(0.41, 0.36, 0.46), vec3(0.95, 1.35, 0.89), vec3(0.18, 0.74, 0.69));
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
