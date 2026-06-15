uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.89 + sr * 16.89 - t * 1.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	p = rot2(length(p) * -1.34 + time * 0.22) * p;
	p = rot2(3.09) * p;
	p = rot2(time * 0.74) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.27));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
