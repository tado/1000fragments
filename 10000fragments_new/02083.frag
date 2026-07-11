uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.78) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.43 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p = fract(p * 2.63) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.02, lr * 1.06 + time * 0.38); }
	p += vec2(0.39, -0.48) * sin(length(p) * 5.81 - time * 1.01) * 0.23;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.87, 0.78, 0.58) * (0.11 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
