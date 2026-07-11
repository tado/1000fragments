uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.13 * cos(sa * 8.0 + t * 1.09 + ph);
    v = sin((sr - petal) * 14.76);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.x += sin(p.y * 4.18 + time * 3.37) * 0.38;
	{ float fr = length(p); p *= 1.0 + 0.52 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.01, length(p) * 3.07 - time * 0.73); }
	p = rot2(2.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.20, 0.18, 0.52) * (0.08 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
