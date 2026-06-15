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
    float petal = 0.41 + 0.13 * cos(sa * 3 + t * 2.94 + ph);
    v = sin((sr - petal) * 15.46);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -2.57 + time * 0.73) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.77, lr * 2.54 + time * 0.38); }
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	p += vec2(-0.57, 0.34) * sin(length(p) * 3.03 - time * 0.79) * 0.28;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.98 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
