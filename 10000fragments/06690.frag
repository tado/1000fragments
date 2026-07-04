uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.37 + t * 3.44 + ph) * 0.7;
    float wb = sin(p.y * 12.77 - t * 1.68 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.71;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.91 / 3.1415927, 1.28 / r - time * 1.23);
	tv.x += tv.y * 0.23;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.25, 0.31, 0.90) * (0.19 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.65, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.05 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
