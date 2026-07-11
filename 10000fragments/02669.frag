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
    float petal = 0.69 + 0.11 * cos(sa * 9 + t * 2.08 + ph);
    v = sin((sr - petal) * 13.88);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	p *= 1.82;
	p = fract(p * 1.52) - 0.5;
	p = rot2(length(p) * 3.29 + time * 1.05) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.23, vec3(0.44, 0.52, 0.58), vec3(0.38, 0.48, 0.39), vec3(1.23, 1.28, 0.85), vec3(0.32, 0.87, 0.31));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
