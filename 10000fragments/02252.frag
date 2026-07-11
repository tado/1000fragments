uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.24 * cos(sa * 9 + t * 1.38 + ph);
    v = sin((sr - petal) * 15.20);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(length(p) * 3.25 + time * 0.35) * p;
	{ p = vec2(atan(p.y, p.x) * 1.92, length(p) * 5.52 - time * 0.27); }
	p += vec2(0.05, -0.49) * sin(length(p) * 4.17 - time * 0.68) * 0.31;
	p = rot2(time * 0.52) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.04));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
