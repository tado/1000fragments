uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.66;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.07 * sin(t * 3.19 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.0 + 0.30 * sin((time * 0.61) * 4.54);
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.34, lr * 2.86 + (time * 0.61) * -0.25); }
	float d = 0.5 + 0.5 * field(p, (time * 0.61), 0.0);
	vec3 col = mix(vec3(0.68, 0.72, 0.59), vec3(0.14, 0.08, 0.14), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.70 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.975, 0.933) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
