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
    float petal = 0.40 + 0.29 * cos(sa * 3 + t * 1.26 + ph);
    v = sin((sr - petal) * 18.08);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	{ p = vec2(atan(p.y, p.x) * 1.65, length(p) * 5.36 - time * 0.54); }
	p = rot2(p.y * -2.63 + time * 0.27) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.05, vec3(0.46, 0.45, 0.43), vec3(0.50, 0.41, 0.32), vec3(0.86, 1.09, 0.82), vec3(0.63, 0.99, 0.73));
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
