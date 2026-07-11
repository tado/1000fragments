uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.59 + sin(p.y * 3.04 + t * 0.71) * 2.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	p = rot2(length(p) * 2.36 + time * 0.23) * p;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	p = rot2(time * 0.59) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.40));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.40 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
