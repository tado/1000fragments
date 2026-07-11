uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.18, t * 1.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.47 / 3.1415927, 0.55 / r + time * 1.57);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.38, 0.16), vec3(0.89, 0.76, 0.76), cc);
	col *= clamp(r * 2.06, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
