uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.19 + t * 3.83 + ph) * 0.7;
    float wb = sin(p.y * 7.76 - t * 3.04 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.60;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.52), cos(time * 1.12)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.31 / 3.1415927, 1.31 / r - time * 1.57);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.00, 0.28), vec3(0.64, 0.65, 0.70), cc);
	col *= clamp(r * 1.28, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
