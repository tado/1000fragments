uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.85 - t * 3.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 0.65)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.87 / 3.1415927, 0.51 / r + time * 1.60);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.19, 0.76, 0.72) * (0.19 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.73, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
