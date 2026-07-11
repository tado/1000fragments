uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.28 * cos(sa * 8 + t * 1.38 + ph);
    v = sin((sr - petal) * 6.46);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	p = fract(p * 1.05) - 0.5;
	p = rot2(p.y * 3.56 + time * 0.63) * p;
	p = rot2(time * 1.39) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.33));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
