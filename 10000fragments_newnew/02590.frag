uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.22 * cos(sa * 4.0 + t * 2.92 + ph);
    v = sin((sr - petal) * 14.15);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.91; }
	p = abs(p) - 0.58;
	p = rot2(length(p) * 1.84 + time * 0.93) * p;
	p = rot2(0.83) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.26));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
