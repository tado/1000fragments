uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.81;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.06 * sin(t * 1.14 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.73) * 0.72), cos((time * 0.73) * 0.54)) * 0.23;
	float an = atan(p.y, p.x) + (time * 0.73) * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.89 / 3.1415927, 0.79 / r + (time * 0.73) * 2.16);
	float d = field(tv, (time * 0.73), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.26, 0.19), vec3(0.69, 0.63, 0.66), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 2.34, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.991, 1.009) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
