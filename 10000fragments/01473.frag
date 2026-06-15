uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.20 * cos(sa * 9 + t * 2.30 + ph);
    v = sin((sr - petal) * 10.99);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.42) * p;
	{ float fr = length(p); p *= 1.0 + 0.25 * fr * fr; }
	p = rot2(time * -1.38) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
