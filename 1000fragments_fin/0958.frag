uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.20;
    v = 0.5 * (sin(2.0 * cp.x + t * 1.77) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 0.84) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.80) * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.39 / 3.1415927, 1.12 / r - (time * 0.80) * 2.43);
	float d = field(tv, (time * 0.80), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(1.000, 0.777, 0.570), vec3(0.035, 0.128, 0.157), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 2.13, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.20 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.973, 1.021, 0.955);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
