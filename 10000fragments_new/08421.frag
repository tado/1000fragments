uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.29 * cos(sa * 7.0 + t * 2.07 + ph);
    v = sin((sr - petal) * 13.65);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.55) * p;
	p = (floor(p * 13.7) + 0.5) / 13.7;
	{ p = vec2(atan(p.y, p.x) * 2.11, length(p) * 2.18 - time * 0.25); }
	p *= 2.16;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.61, 0.74, 0.73) * (0.23 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
