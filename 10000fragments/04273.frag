uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.19 + vec2(t * 0.89, -t * 1.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.52 * fr * fr; }
	p = fract(p * 1.51) - 0.5;
	p = sin(p * 2.35 + time * 1.96) * 0.74;
	p = rot2(3.09) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.75));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
