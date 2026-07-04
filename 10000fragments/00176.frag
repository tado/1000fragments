uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.04 + sin(p.y * 1.17 + t * 5.69) * 2.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.51), cos(time * 0.46)) * 0.05;
	float an = atan(p.y, p.x) + time * -0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.42 / 3.1415927, 1.21 / r + time * 2.40);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.05, 0.42), vec3(0.63, 0.61, 0.90), cc);
	col *= clamp(r * 1.50, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.15 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
