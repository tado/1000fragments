uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.10;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.20 + 0.10 * sin(t * 3.97 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.39), cos(time * 1.50)) * 0.23;
	float an = atan(p.y, p.x) + time * -0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.39 / 3.1415927, 1.16 / r + time * 1.28);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.78 + time * 0.38);
	col *= clamp(r * 1.47, 0.0, 1.0);
	col = mod(col * 2.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
