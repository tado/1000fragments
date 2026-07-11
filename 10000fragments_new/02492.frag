uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.35 - t * 7.21 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.19;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.21 / 3.1415927, 0.42 / r - time * 2.31);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.36, 0.08), vec3(0.86, 0.81, 0.92), cc);
	col *= clamp(r * 2.54, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
