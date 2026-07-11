uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.27, t * 0.58 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.29), cos(time * 0.86)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.46 / 3.1415927, 1.10 / r + time * 0.89);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.71, 0.73, 0.53) * (0.13 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.65, 0.0, 1.0);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 2.85 + time * 7.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
