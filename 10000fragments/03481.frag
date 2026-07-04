uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.28 * cos(sa * 4.0 + t * 2.90 + ph);
    v = sin((sr - petal) * 7.76);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	p += vec2(0.58, 0.48) * sin(length(p) * 5.43 - time * 1.52) * 0.19;
	p = rot2(length(p) * -1.31 + time * 0.70) * p;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.44, 0.76, 0.94) * (0.23 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
