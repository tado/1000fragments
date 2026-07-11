uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.19 * cos(sa * 3.0 + t * 2.30 + ph);
    v = sin((sr - petal) * 11.72);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	p = rot2(p.y * -2.94 + time * 0.45) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.63));
	col = 0.5 + 0.5 * col;
	col *= 0.89 + 0.20 * sin(gl_FragCoord.y * 1.16 + time * 14.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
