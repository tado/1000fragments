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
    float petal = 0.37 + 0.14 * cos(sa * 5 + t * 2.82 + ph);
    v = sin((sr - petal) * 19.63);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.89, -0.81) * sin(length(p) * 3.95 - time * 0.51) * 0.22;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.25 * fr * fr; }
	p = rot2(time * -0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.19 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
