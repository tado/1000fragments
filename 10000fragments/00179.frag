uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.18 * cos(sa * 5 + t * 1.22 + ph);
    v = sin((sr - petal) * 19.89);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	p = rot2(p.y * 2.32 + time * 0.42) * p;
	p = fract(p * 2.52) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.69), field(p, time, 1.38));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
