uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.50 + t * 1.22 + ph) * 0.7;
    float wb = sin(p.y * 14.76 - t * 0.80 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.41;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.55), cos(time * 0.59)) * 0.08;
	float an = atan(p.y, p.x) + time * 0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.64 / 3.1415927, 0.42 / r - time * 2.27);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.39, 0.12), vec3(0.84, 0.72, 0.94), cc);
	col *= clamp(r * 2.96, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.09 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
