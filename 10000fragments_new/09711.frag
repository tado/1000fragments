uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.15 + t * 1.53 + ph) * 0.7;
    float wb = sin(p.y * 6.24 - t * 1.55 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.34;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.32), cos(time * 0.53)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.02 / 3.1415927, 1.07 / r - time * 1.12);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.08 + time * 0.30);
	col *= clamp(r * 2.40, 0.0, 1.0);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.70 + time * 6.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
