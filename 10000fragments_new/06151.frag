uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.44 + sr * 4.24 - t * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.43), cos(time * 0.86)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.34 / 3.1415927, 1.33 / r - time * 1.46);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.19, 0.18), vec3(0.62, 0.87, 0.51), cc);
	col *= clamp(r * 1.29, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
