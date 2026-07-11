uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.97 + t * 2.80 + ph) * 0.7;
    float wb = sin(p.y * 16.59 - t * 2.85 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.66;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.63;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.28 / 3.1415927, 0.42 / r - time * 2.64);
	tv.x += tv.y * 0.29;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.12, 0.08), vec3(0.60, 0.67, 0.52), cc);
	col *= clamp(r * 2.39, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.27 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
