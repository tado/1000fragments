uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.55 + sr * 6.29 - t * 3.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	p = rot2(time * 1.19) * p;
	{ p = vec2(atan(p.y, p.x) * 2.61, length(p) * 2.87 - time * 0.51); }
	p = fract(p * 2.67) - 0.5;
	p = rot2(length(p) * -2.30 + time * 0.75) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.97), field(p, time, 1.94));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
