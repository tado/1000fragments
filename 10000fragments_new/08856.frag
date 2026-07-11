uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.05 + sr * 13.77 - t * 3.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.46 / 3.1415927, 1.34 / r - time * 0.83);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.08, 0.23), vec3(0.82, 0.75, 0.89), cc);
	col *= clamp(r * 1.60, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
