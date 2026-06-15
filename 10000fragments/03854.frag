uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.69 + sin(p.y * 1.42 + t * 5.76) * 3.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.74;
	p += vec2(0.13, 0.89) * sin(length(p) * 3.07 - time * 1.55) * 0.15;
	{ p = vec2(atan(p.y, p.x) * 1.05, length(p) * 3.43 - time * 0.35); }
	p *= 1.88;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.42), field(p, time, 0.84));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
