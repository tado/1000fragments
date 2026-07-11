uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.36 + t * 3.71 + ph) + sin(p.y * 8.26 - t * 3.71 + ph)
        + sin((p.x + p.y) * 7.86 + t * 3.71 + ph) + sin(length(p) * 11.19 - t * 3.71 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.37), cos(time * 0.56)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.23 / 3.1415927, 0.98 / r - time * 1.20);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.08 + time * 0.11);
	col *= clamp(r * 1.19, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
