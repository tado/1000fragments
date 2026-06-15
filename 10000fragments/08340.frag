uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.31 + sr * 23.53 - t * 1.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 4.13 - time * 0.76); }
	p = rot2(length(p) * 3.38 + time * 1.09) * p;
	p += vec2(0.82, 0.66) * sin(length(p) * 3.59 - time * 0.71) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.57));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
