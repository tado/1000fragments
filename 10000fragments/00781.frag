uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.48 + sin(p.y * 5.24 + t * 1.76) * 4.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.43;
	{ float fr = length(p); p *= 1.0 + -0.32 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.15), field(p, time, 2.31));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
