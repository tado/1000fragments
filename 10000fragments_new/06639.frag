uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.55, t * 1.76 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.65), cos(time * 0.93)) * 0.30;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.14 / 3.1415927, 0.30 / r - time * 2.62);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.88, 0.90, 0.92) * (0.13 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 1.17, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
