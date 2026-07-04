uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.48;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.11 * sin(t * 3.27 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.48), cos(time * 1.41)) * 0.10;
	float an = atan(p.y, p.x) + time * 0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.39 / 3.1415927, 1.09 / r + time * 1.79);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.79 + time * 0.18);
	col *= clamp(r * 1.18, 0.0, 1.0);
	col = mod(col * 1.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
