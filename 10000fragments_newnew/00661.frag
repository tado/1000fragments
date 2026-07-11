uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.13 + t * 3.18 + ph) * 0.7;
    float wb = sin(p.y * 6.73 - t * 2.53 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.67;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.77), cos(time * 0.93)) * 0.24;
	float an = atan(p.y, p.x) + time * 0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.90 / 3.1415927, 0.68 / r + time * 1.26);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.31, 0.49, 0.42) * (0.16 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.84, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
