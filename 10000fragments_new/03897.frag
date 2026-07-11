uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.48 + sin(p.y * 1.66 + t * 1.28) * 3.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.75 / 3.1415927, 1.09 / r + time * 2.23);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.05, 0.17), vec3(0.82, 0.61, 0.50), cc);
	col *= clamp(r * 2.85, 0.0, 1.0);
	col = fract(col * 2.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
