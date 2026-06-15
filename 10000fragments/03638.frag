uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.16 * cos(sa * 7 + t * 0.68 + ph);
    v = sin((sr - petal) * 17.74);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	p = rot2(length(p) * -3.11 + time * 0.62) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.37), field(p, time, 0.75));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
