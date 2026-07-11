uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.43 + t * 1.73 + ph) + sin(p.y * 4.35 - t * 4.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.19, lr * 2.97 + time * -0.53); }
	p += vec2(0.12, 0.81) * sin(length(p) * 5.21 - time * 1.39) * 0.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.90));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
