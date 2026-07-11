uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.63 + sr * 7.37 - t * 1.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	p = rot2(time * 0.54) * p;
	p = fract(p * 2.47) - 0.5;
	p = rot2(1.77) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.47));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
