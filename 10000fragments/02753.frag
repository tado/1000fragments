uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.20 + t * 1.21) - 0.5) * 2.0;
    v = sin((p.y * 7.26 + zx * 0.52 + t * 0.76) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 4.85 + time * 1.85) * 0.30;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.92, lr * 2.08 + time * 0.21); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.73));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
