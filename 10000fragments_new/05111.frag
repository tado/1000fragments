uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.44, t * 1.50 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.48), cos(time * 0.79)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.66 / 3.1415927, 1.04 / r + time * 0.66);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.50, 0.82, 0.96) * (0.25 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.32, 0.0, 1.0);
	col = mod(col * 2.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
