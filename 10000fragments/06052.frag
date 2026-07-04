uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.55 - t * 1.48;
    v = sin(floor(lv * 5.6) / 5.6 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.39), cos(time * 1.03)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.46 / 3.1415927, 0.68 / r + time * 1.94);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.59, 0.71, 0.93) * (0.08 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 1.42, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
