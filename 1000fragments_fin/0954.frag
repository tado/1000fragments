uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.22 + t * 0.83 + ph) + sin(p.y * 12.88 - t * 0.83 + ph)
        + sin((p.x + p.y) * 9.43 + t * 0.83 + ph) + sin(length(p) * 11.90 - t * 0.83 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.09 / 3.1415927, 0.33 / r + (time * 0.85) * 2.87);
	float d = field(tv, (time * 0.85), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.68, 0.53, 0.66) + vec3(0.01, 0.06, 0.07);
	col *= clamp(r * 1.65, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.000, 0.988, 1.005);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
