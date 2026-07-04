uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.91;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.32 + 0.15 * sin(t * 1.16 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.34;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.53 / 3.1415927, 0.46 / r + time * 2.47);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.21, vec3(0.47, 0.55, 0.57), vec3(0.37, 0.42, 0.37), vec3(0.70, 1.16, 0.81), vec3(0.15, 0.94, 0.09));
	col *= clamp(r * 1.19, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
