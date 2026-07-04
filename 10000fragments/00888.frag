uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.73;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.23 + 0.10 * sin(t * 4.65 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.72), cos(time * 0.63)) * 0.19;
	float an = atan(p.y, p.x) + time * -0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.65 / 3.1415927, 1.12 / r + time * 1.37);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.74 + time * 0.85);
	col *= clamp(r * 2.29, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
