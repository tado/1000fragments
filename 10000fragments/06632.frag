uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.03 + t * 3.38 + ph) * 0.7;
    float wb = sin(p.y * 12.62 - t * 3.54 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.64;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.54), cos(time * 0.58)) * 0.20;
	float an = atan(p.y, p.x) + time * 0.39;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.67 / 3.1415927, 0.68 / r - time * 2.49);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.15 + time * 0.99);
	col *= clamp(r * 1.00, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.77 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
