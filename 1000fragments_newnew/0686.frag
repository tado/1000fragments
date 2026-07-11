uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.42;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.21 + 0.10 * sin(t * 4.59 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.82) * 1.11), cos((time * 0.82) * 0.89)) * 0.28;
	float an = atan(p.y, p.x) + (time * 0.82) * 0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.81 / 3.1415927, 0.86 / r + (time * 0.82) * 0.97);
	float d = field(tv, (time * 0.82), 0.0);
	vec3 col = vec3(0.58, 0.67, 0.71) * (0.12 / (abs((d)) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 2.03, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.975, 0.913) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
