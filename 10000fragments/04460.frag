uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.69) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.38 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	p = abs(p) - 0.55;
	{ p = vec2(atan(p.y, p.x) * 2.78, length(p) * 2.32 - time * 0.38); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.13, lr * 1.18 + time * -0.16); }
	p += vec2(0.23, 0.05) * sin(length(p) * 5.28 - time * 1.72) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.36 + time * 0.21);
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
