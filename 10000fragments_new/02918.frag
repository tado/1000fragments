uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.45 + t * 0.63 + ph) * 0.7;
    float wb = sin(p.y * 14.38 - t * 1.24 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.39;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.43), cos(time * 1.42)) * 0.29;
	float an = atan(p.y, p.x) + time * -0.47;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.86 / 3.1415927, 0.60 / r + time * 1.83);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.42 + time * 0.15);
	col *= clamp(r * 2.03, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
