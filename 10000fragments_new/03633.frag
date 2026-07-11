uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.93, t * 0.94 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.14), cos(time * 1.04)) * 0.19;
	float an = atan(p.y, p.x) + time * 0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.27 / 3.1415927, 1.23 / r + time * 2.48);
	tv.x += tv.y * 0.17;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.41 + time * 0.66);
	col *= clamp(r * 2.34, 0.0, 1.0);
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
