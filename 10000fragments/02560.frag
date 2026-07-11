uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.16 * cos(sa * 4 + t * 2.63 + ph);
    v = sin((sr - petal) * 9.08);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.18) * p;
	{ p = vec2(atan(p.y, p.x) * 2.09, length(p) * 3.55 - time * 0.49); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.78));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
