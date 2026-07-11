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
    float petal = 0.39 + 0.19 * cos(sa * 9 + t * 1.79 + ph);
    v = sin((sr - petal) * 8.58);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p += vec2(-0.31, 0.05) * sin(length(p) * 3.68 - time * 0.54) * 0.27;
	p = abs(p);
	p = rot2(time * -0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.10, vec3(0.57, 0.55, 0.41), vec3(0.46, 0.31, 0.34), vec3(1.38, 0.96, 1.07), vec3(0.92, 0.97, 0.02));
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
