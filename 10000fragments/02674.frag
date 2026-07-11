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
    float petal = 0.34 + 0.23 * cos(sa * 8 + t * 1.25 + ph);
    v = sin((sr - petal) * 14.32);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 4.50 - time * 0.19); }
	p = abs(p);
	p = rot2(time * -0.57) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.16, vec3(0.51, 0.43, 0.40), vec3(0.38, 0.49, 0.41), vec3(1.06, 1.26, 1.01), vec3(0.14, 0.65, 0.82));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
