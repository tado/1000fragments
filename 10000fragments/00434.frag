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
    float petal = 0.68 + 0.15 * cos(sa * 9 + t * 1.51 + ph);
    v = sin((sr - petal) * 16.02);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.43) * p;
	p = fract(p * 1.11) - 0.5;
	p = rot2(p.y * -2.24 + time * 0.60) * p;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.36 + time * 0.13);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
