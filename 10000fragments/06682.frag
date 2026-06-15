uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.82 + sr * 5.43 - t * 3.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.00) * p;
	p = rot2(length(p) * 3.94 + time * 0.81) * p;
	p = rot2(p.y * 2.16 + time * 0.13) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
