uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.85 + sin(p.y * 5.10 + t * 3.98) * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.73 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.96, length(p) * 4.79 - time * 0.44); }
	p = rot2(1.23) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.64));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
