uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.93 + vec2(t * 2.83, -t * 0.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.28 / 3.1415927, 0.97 / r - time * 1.73);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.69, 1.25, 1.07) + vec3(0.23, 0.10, 0.07);
	col *= clamp(r * 2.82, 0.0, 1.0);
	col = mod(col * 2.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
