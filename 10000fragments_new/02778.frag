uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.58 + sin(p.y * 3.14 + t * 2.22) * 2.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	{ float fr = length(p); p *= 1.0 + 0.23 * fr * fr; }
	p = rot2(length(p) * 2.05 + time * 0.95) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.48));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
