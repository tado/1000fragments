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
    float petal = 0.53 + 0.29 * cos(sa * 6 + t * 0.77 + ph);
    v = sin((sr - petal) * 14.76);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.46) * p;
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	p = fract(p * 1.95) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.83 + time * 0.18);
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
