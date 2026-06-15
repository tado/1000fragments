uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.50 + t * 3.07 + ph) + sin(p.y * 10.23 - t * 2.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	p = rot2(p.y * 2.67 + time * 0.52) * p;
	p = abs(p) - 0.32;
	{ p = vec2(atan(p.y, p.x) * 1.69, length(p) * 3.22 - time * 0.26); }
	p = rot2(length(p) * -2.61 + time * 1.01) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.85));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
