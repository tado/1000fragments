uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.12 * cos(sa * 4 + t * 0.67 + ph);
    v = sin((sr - petal) * 7.66);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.21, length(p) * 4.06 - time * 0.22); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
