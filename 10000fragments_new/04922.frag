uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.05 + t * 1.91 + ph) * 0.7;
    float wb = sin(p.y * 8.28 - t * 2.79 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.69;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 1.35)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 4.00 / 3.1415927, 0.79 / r - time * 0.80);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.84 + time * 0.20);
	col *= clamp(r * 2.02, 0.0, 1.0);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 2.08 + time * 16.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
