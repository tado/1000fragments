uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.26 + t * 1.75 + ph) + sin(p.y * 7.29 - t * 1.75 + ph)
        + sin((p.x + p.y) * 9.00 + t * 1.75 + ph) + sin(length(p) * 11.55 - t * 1.75 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	p = fract(p * 2.43) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.17, length(p) * 5.94 - time * 0.26); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
