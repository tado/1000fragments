uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.22 * cos(sa * 5 + t * 0.42 + ph);
    v = sin((sr - petal) * 11.59);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	p = rot2(p.y * 2.17 + time * 0.41) * p;
	p = rot2(time * -0.89) * p;
	p = rot2(0.93) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.27));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
