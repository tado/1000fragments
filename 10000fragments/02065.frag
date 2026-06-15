uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.48 + sr * 8.56 - t * 4.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	p = rot2(2.08) * p;
	p = rot2(length(p) * 2.75 + time * 0.78) * p;
	p += vec2(-0.13, -0.83) * sin(length(p) * 3.54 - time * 1.42) * 0.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
