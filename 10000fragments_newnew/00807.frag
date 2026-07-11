uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.36;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.09 * sin(t * 4.80 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.35), cos(time * 0.60)) * 0.05;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.97 / 3.1415927, 0.69 / r + time * 1.08);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.31, vec3(0.55, 0.50, 0.44), vec3(0.43, 0.49, 0.46), vec3(0.90, 1.11, 1.21), vec3(0.96, 0.74, 0.33));
	col *= clamp(r * 2.24, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
