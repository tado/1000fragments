uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.89, t * 0.64 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.23;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.20 / 3.1415927, 0.44 / r + time * 2.48);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.91, 0.78, 0.25) * (0.19 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 2.97, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
