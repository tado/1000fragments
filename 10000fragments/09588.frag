uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.25;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.30 + 0.07 * sin(t * 2.93 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.73 / 3.1415927, 0.42 / r - time * 2.79);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.26, vec3(0.52, 0.40, 0.56), vec3(0.32, 0.40, 0.44), vec3(0.93, 0.86, 1.09), vec3(0.36, 0.77, 0.31));
	col *= clamp(r * 1.96, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
