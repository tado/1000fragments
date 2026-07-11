uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.92, t * 0.40 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.58 / 3.1415927, 0.32 / r - time * 2.48);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.24, 0.50, 0.66) * (0.13 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 2.25, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
