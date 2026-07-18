uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.23;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.77) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 2.75) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	float an = atan(p.y, p.x) + (time * 0.73) * -0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.73 / 3.1415927, 0.93 / r - (time * 0.73) * 2.13);
	float d = field(tv, (time * 0.73), 0.0);
	vec3 col = vec3(0.696, 0.936, 0.796) * (0.07 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.03, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.005, 0.949, 1.008);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
