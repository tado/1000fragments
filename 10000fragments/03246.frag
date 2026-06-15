uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.79 + sr * 19.12 - t * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.21, lr * 1.68 + time * -0.49); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.13));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
