uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.28 * cos(sa * 9.0 + t * 2.56 + ph);
    v = sin((sr - petal) * 14.85);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.62;
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	p = rot2(time * -0.99) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.48, 0.41, 0.18) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
