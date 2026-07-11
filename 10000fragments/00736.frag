uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.79 + sin(p.y * 1.80 + t * 5.41) * 1.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2(0.68) * p;
	p += vec2(0.06, -0.71) * sin(length(p) * 3.98 - time * 1.71) * 0.10;
	p = rot2(time * 0.37) * p;
	p = rot2(p.y * 2.23 + time * 0.65) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
