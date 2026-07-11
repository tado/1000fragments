uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.65) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 3.34 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.76;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.21, lr * 1.28 + time * -0.64); }
	p *= 2.00;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.39, 0.47, 0.46), vec3(0.88, 0.72, 0.52), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
