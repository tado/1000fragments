uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.09 + sr * 10.65 - t * 1.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	p *= 2.65;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.37, length(p) * 4.49 - time * 0.75); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.48));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
