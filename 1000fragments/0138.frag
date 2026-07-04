uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.38, t * 1.41 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.73), cos(time * 1.02)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.16 / 3.1415927, 1.45 / r + time * 0.68);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.94, 0.24, 0.16) * (0.25 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.50, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
