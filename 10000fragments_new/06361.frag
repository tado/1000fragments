uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.60 - t * 4.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.86), cos(time * 1.44)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.51 / 3.1415927, 0.44 / r + time * 2.65);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.77, 0.47, 0.39) * (0.07 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.78, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
