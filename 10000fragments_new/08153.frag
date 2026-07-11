uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.90 + t * 4.00 + ph) * 0.7;
    float wb = sin(p.y * 16.98 - t * 1.83 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.40;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.33), cos(time * 1.15)) * 0.12;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.68 / 3.1415927, 0.84 / r - time * 2.78);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 0.62, 0.62) + vec3(0.16, 0.07, 0.21);
	col *= clamp(r * 1.70, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
