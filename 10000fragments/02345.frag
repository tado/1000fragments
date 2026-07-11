uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.25 * cos(sa * 6 + t * 0.82 + ph);
    v = sin((sr - petal) * 8.16);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.96, length(p) * 2.98 - time * 0.35); }
	p = rot2(time * -0.61) * p;
	p = rot2(2.52) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.33 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
