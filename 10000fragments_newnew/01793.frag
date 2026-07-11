uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.59 + vec2(t * 0.55, -t * 1.86) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.26), cos(time * 0.87)) * 0.08;
	float an = atan(p.y, p.x) + time * -0.63;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.85 / 3.1415927, 1.28 / r - time * 2.84);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.06 + time * 0.55);
	col *= clamp(r * 1.91, 0.0, 1.0);
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 2.02 + time * 8.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
