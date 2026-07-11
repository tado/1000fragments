uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.28 * cos(sa * 5.0 + t * 1.74 + ph);
    v = sin((sr - petal) * 15.60);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.72) * 0.82), cos((time * 0.72) * 0.63)) * 0.13;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.36 / 3.1415927, 1.02 / r + (time * 0.72) * 2.26);
	tv.x += tv.y * 0.19;
	float d = field(tv, (time * 0.72), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.24, 0.18), vec3(0.81, 0.78, 0.71), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.80, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.943, 1.026) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
