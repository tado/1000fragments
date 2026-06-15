uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.44 - t * 6.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 4.79 - time * 0.12); }
	p *= 2.01;
	p = rot2(1.63) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.47));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
