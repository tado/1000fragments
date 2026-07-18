uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.31 * sin(mf + 3.0) + ph), cos(t * 2.49 * cos(mf + 3.0) + ph));
        ms += 0.057 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.72) * 0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.12 / 3.1415927, 0.62 / r - (time * 0.72) * 1.21);
	float d = field(tv, (time * 0.72), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.015, 0.048, 0.108), vec3(0.130, 0.429, 0.749), smoothstep(0.0, 0.49, cc)), vec3(0.832, 0.960, 0.982), smoothstep(0.49, 1.0, cc));
	col *= clamp(r * 2.81, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.980, 0.997, 0.941);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
