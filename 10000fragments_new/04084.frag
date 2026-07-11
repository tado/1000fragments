uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.18 + sr * 7.60 - t * 2.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.29 / 3.1415927, 1.25 / r + time * 1.32);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.07, 0.01), vec3(0.66, 0.99, 0.80), cc);
	col *= clamp(r * 2.73, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
