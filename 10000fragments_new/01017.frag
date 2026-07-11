uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.02 + vec2(t * 1.60, -t * 1.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.88), cos(time * 1.38)) * 0.22;
	float an = atan(p.y, p.x) + time * -0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 0.97 / r + time * 0.67);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.26 + time * 0.55);
	col *= clamp(r * 1.92, 0.0, 1.0);
	col = mod(col * 1.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
