uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.10 + t * 3.68 + ph) + sin(p.y * 17.16 - t * 4.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	p = rot2(p.y * 1.13 + time * 0.46) * p;
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 3.41 - time * 0.55); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
