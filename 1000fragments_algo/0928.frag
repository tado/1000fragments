uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.25 + t * 1.88 + ph) * 0.7;
    float wb = sin(p.y * 18.45 - t * 3.17 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.38;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.50 / 3.1415927, 0.84 / r - (time * 0.73) * 1.62);
	tv.x += tv.y * 0.14;
	float d = field(tv, (time * 0.73), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.10, 0.14), vec3(0.74, 0.78, 0.74), cc);
	col *= clamp(r * 1.65, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.035, 0.981, 0.925) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
