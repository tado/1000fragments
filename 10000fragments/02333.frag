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
    float petal = 0.50 + 0.26 * cos(sa * 8 + t * 0.98 + ph);
    v = sin((sr - petal) * 13.40);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -0.94) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.18, vec3(0.53, 0.45, 0.47), vec3(0.37, 0.36, 0.39), vec3(0.96, 1.06, 1.13), vec3(0.92, 0.36, 0.61));
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
