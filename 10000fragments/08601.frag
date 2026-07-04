uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.53 + sr * 17.82 - t * 3.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.15 / 3.1415927, 1.14 / r + time * 0.67);
	tv.x += tv.y * 0.29;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.26, 0.08), vec3(0.93, 0.56, 0.65), cc);
	col *= clamp(r * 2.65, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
