uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 21.14 - t * 3.87 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 37.84 - t * 3.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.89, length(p) * 3.87 - time * 0.11); }
	p = rot2(time * 1.06) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.32), field(p, time, 2.64));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
