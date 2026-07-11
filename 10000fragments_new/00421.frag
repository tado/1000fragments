uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.12 * cos(sa * 5.0 + t * 1.77 + ph);
    v = sin((sr - petal) * 7.89);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.52 / 3.1415927, 1.28 / r - time * 1.48);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.20, 0.10), vec3(0.94, 0.75, 0.60), cc);
	col *= clamp(r * 2.83, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.54 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
