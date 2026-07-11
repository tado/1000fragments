uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.12 * cos(sa * 6.0 + t * 2.74 + ph);
    v = sin((sr - petal) * 15.92);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	p = rot2(length(p) * 1.87 + time * 1.14) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.25));
	p = sin(p * 1.82 + time * 0.61) * 1.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.03));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
