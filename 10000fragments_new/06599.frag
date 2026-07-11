uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.77 + sin(p.y * 4.30 + t * 0.50) * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -2.13 + time * 1.49) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.71));
	col = 0.5 + 0.5 * col;
	col *= 0.88 + 0.20 * sin(gl_FragCoord.y * 1.30 + time * 16.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
