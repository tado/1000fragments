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
    float petal = 0.57 + 0.28 * cos(sa * 4.0 + t * 0.56 + ph);
    v = sin((sr - petal) * 17.48);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	p *= 1.98;
	p += vec2(0.79, 0.33) * sin(length(p) * 2.92 - time * 1.05) * 0.17;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(2.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.19, vec3(0.60, 0.46, 0.56), vec3(0.36, 0.36, 0.39), vec3(1.18, 0.91, 0.98), vec3(0.02, 0.33, 0.44));
	col = mod(col * 2.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
