uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.67 + sr * 22.87 - t * 0.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	p = rot2(time * 1.18) * p;
	{ p = vec2(atan(p.y, p.x) * 2.78, length(p) * 2.34 - time * 0.23); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.18));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
