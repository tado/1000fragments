uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.69) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 2.76 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.61) * 0.98), cos((time * 0.61) * 1.03)) * 0.16;
	float an = atan(p.y, p.x) + (time * 0.61) * -0.60;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.56 / 3.1415927, 1.00 / r - (time * 0.61) * 1.27);
	tv.x += tv.y * 0.43;
	float d = field(tv, (time * 0.61), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.27, 0.31), vec3(0.68, 0.65, 0.61), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 2.18, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 1.007, 0.943) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
