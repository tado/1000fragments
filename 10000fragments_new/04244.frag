uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.21 + sr * 10.71 - t * 1.56 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 3.12 - time * 0.51); }
	p *= 1.68;
	p = rot2(length(p) * 3.66 + time * 0.72) * p;
	p = rot2(p.y * 1.63 + time * 0.52) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.68));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
