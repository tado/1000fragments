uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.36 + t * 1.60 + ph) * 0.7;
    float wb = sin(p.y * 12.48 - t * 2.12 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 1.33)) * 0.07;
	float an = atan(p.y, p.x) + time * 0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.64 / 3.1415927, 0.34 / r + time * 2.35);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.10, 0.01), vec3(0.97, 0.96, 0.77), cc);
	col *= clamp(r * 2.12, 0.0, 1.0);
	col = mod(col * 1.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
