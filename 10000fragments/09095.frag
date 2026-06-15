uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 12.91 - t * 2.29 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 14.67 - t * 2.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.03, lr * 2.96 + time * 0.74); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
