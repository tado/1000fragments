uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.80) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 1.91 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.12, lr * 1.58 + time * -0.82); }
	p = (floor(p * 24.9) + 0.5) / 24.9;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.05, 0.41, 0.32), vec3(0.69, 0.57, 0.82), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.15 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
