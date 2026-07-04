uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.88;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.23 + 0.14 * sin(t * 2.09 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.37), cos(time * 0.55)) * 0.27;
	float an = atan(p.y, p.x) + time * -0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.84 / 3.1415927, 0.96 / r - time * 2.49);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.25, vec3(0.56, 0.56, 0.47), vec3(0.30, 0.49, 0.38), vec3(0.83, 0.75, 1.09), vec3(0.47, 0.21, 0.65));
	col *= clamp(r * 2.75, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
