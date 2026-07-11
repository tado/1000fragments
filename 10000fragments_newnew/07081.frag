uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.36 - t * 1.26;
    v = sin(floor(lv * 2.8) / 2.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.67), cos(time * 1.16)) * 0.08;
	float an = atan(p.y, p.x) + time * -0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.54 / 3.1415927, 1.23 / r - time * 2.28);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.53 + time * 0.28);
	col *= clamp(r * 1.64, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
