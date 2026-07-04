uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.93, t * 2.48 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.56 / 3.1415927, 1.49 / r + time * 2.12);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.42, 1.48, 1.36) + vec3(0.06, 0.14, 0.09);
	col *= clamp(r * 2.09, 0.0, 1.0);
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
