uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.22) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 3.99 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.71, lr * 2.46 + time * 0.73); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.09, 0.09), vec3(0.87, 0.66, 0.62), d);
	col = mod(col * 1.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
