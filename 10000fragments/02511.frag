uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.53 - t * 1.50;
    v = sin(floor(lv * 2.8) / 2.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.26), cos(time * 1.19)) * 0.28;
	float an = atan(p.y, p.x) + time * 0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.84 / 3.1415927, 1.08 / r - time * 2.41);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.51 + time * 0.55);
	col *= clamp(r * 1.53, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.61 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
