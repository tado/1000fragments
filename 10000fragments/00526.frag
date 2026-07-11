uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.29 + sin(p.y * 2.82 + t * 4.15) * 2.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	{ float fr = length(p); p *= 1.0 + 0.63 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
