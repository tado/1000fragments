uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.69 + t * 2.60 + ph) * 0.7;
    float wb = sin(p.y * 8.24 - t * 3.51 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.62;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.22) - 0.5;
	p = (floor(p * 12.9) + 0.5) / 12.9;
	{ p = vec2(atan(p.y, p.x) * 1.28, length(p) * 4.22 - time * 0.63); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 2.43 + time * -0.30); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.01, 0.16), vec3(0.72, 0.98, 0.64), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.86 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
