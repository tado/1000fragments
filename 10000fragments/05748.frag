uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.91 + t * 3.61 + ph) * 0.7;
    float wb = sin(p.y * 11.76 - t * 0.54 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.38;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.11 / 3.1415927, 1.02 / r + time * 2.27);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.25, 0.37), vec3(0.93, 0.88, 0.71), cc);
	col *= clamp(r * 1.70, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.86 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
