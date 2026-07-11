uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.90 + sr * 17.01 - t * 0.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	p = rot2(p.y * -3.49 + time * 0.83) * p;
	{ p = vec2(atan(p.y, p.x) * 2.25, length(p) * 3.49 - time * 0.38); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
