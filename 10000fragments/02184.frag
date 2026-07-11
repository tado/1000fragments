uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.05 + sr * 4.36 - t * 1.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	{ p = vec2(atan(p.y, p.x) * 2.02, length(p) * 3.54 - time * 0.64); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.65));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
