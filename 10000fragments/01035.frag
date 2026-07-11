uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.42 + t * 2.14 + ph) + sin(p.y * 10.12 - t * 2.14 + ph)
        + sin((p.x + p.y) * 8.97 + t * 2.14 + ph) + sin(length(p) * 4.29 - t * 2.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 2.09 + time * 0.60); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
