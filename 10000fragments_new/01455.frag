uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.39, t * 0.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.97 / 3.1415927, 0.78 / r - time * 1.74);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.96, 0.67, 0.64) * (0.11 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 1.21, 0.0, 1.0);
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
