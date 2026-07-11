uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.18 * cos(sa * 6 + t * 1.77 + ph);
    v = sin((sr - petal) * 19.59);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.65, length(p) * 2.19 - time * 0.75); }
	p += vec2(0.76, -0.83) * sin(length(p) * 2.44 - time * 0.87) * 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.96));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
