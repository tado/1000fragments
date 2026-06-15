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
    float petal = 0.32 + 0.13 * cos(sa * 5 + t * 1.24 + ph);
    v = sin((sr - petal) * 19.97);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	p = rot2(0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.26, vec3(0.52, 0.43, 0.55), vec3(0.45, 0.40, 0.44), vec3(0.94, 1.35, 0.84), vec3(0.62, 0.93, 0.87));
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
