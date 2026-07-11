uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.30 + t * 2.30 + ph) * 0.7;
    float wb = sin(p.y * 7.41 - t * 1.30 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.72;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 1.41)) * 0.09;
	float an = atan(p.y, p.x) + time * 0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.40 / 3.1415927, 0.35 / r - time * 2.30);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.63, 0.45, 0.92) * (0.21 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.12, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
