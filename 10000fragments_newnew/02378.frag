uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 7.79 * sin(t * 1.40) + t * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 24.1) + 0.5) / 24.1;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.23, lr * 2.14 + time * 0.77); }
	p.x += sin(p.y * 7.58 + time * 2.40) * 0.13;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.00, 0.32, 0.14), vec3(0.84, 0.64, 0.69), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
