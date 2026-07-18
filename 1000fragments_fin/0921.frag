uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.62 + t * 1.08 + ph) + sin(p.y * 5.05 - t * 1.08 + ph)
        + sin((p.x + p.y) * 6.72 + t * 1.08 + ph) + sin(length(p) * 10.84 - t * 1.08 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p = p.yx;
	p += vec2(sin((time * 0.77) * 0.41), cos((time * 0.77) * 0.73)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.03 / 3.1415927, 0.56 / r + (time * 0.77) * 1.56);
	float d = field(tv, (time * 0.77), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.008, 0.057, 0.106), vec3(0.105, 0.461, 0.523), smoothstep(0.0, 0.56, cc)), vec3(1.000, 0.848, 0.433), smoothstep(0.56, 1.0, cc));
	col *= clamp(r * 2.45, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.015, 0.974, 1.025);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
