uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.58 - t * 1.63 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.93), cos(time * 1.05)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.27 / 3.1415927, 0.51 / r + time * 1.21);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.44, 0.21, 0.47) * (0.09 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.71, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
