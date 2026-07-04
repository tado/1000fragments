uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.29 * cos(sa * 4.0 + t * 0.76 + ph);
    v = sin((sr - petal) * 18.36);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -2.27 + time * 0.82) * p;
	p.x += sin(p.y * 3.92 + time * 3.47) * 0.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.57));
	col = 0.5 + 0.5 * col;
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 1.50 + time * 12.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
