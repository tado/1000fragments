uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.94 + t * 3.34 + ph) * 0.7;
    float wb = sin(p.y * 14.43 - t * 3.25 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.35;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.20 / 3.1415927, 1.36 / r - time * 2.43);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.42, 0.22, 0.31) * (0.22 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.24, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.76 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
