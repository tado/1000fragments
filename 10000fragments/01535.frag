uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.84 - t * 6.44 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.32 + time * 0.59) * p;
	p *= 1.43;
	{ p = vec2(atan(p.y, p.x) * 2.85, length(p) * 5.07 - time * 0.27); }
	p = rot2(length(p) * -3.50 + time * 0.28) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.87));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
