uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.17 + sin(p.y * 1.58 + t * 2.00) * 3.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.00;
	p = fract(p * 1.44) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.01, lr * 1.22 + time * 0.90); }
	p += vec2(0.35, -0.65) * sin(length(p) * 5.46 - time * 2.27) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.22, 0.68, 0.93) * (0.08 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 1.63 + time * 14.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
