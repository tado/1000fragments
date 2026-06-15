uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.13 * cos(sa * 3 + t * 0.56 + ph);
    v = sin((sr - petal) * 15.22);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.94) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.55));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
