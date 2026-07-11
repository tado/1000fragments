uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.45 + t * 2.67 + ph) + sin(p.y * 6.99 - t * 2.67 + ph)
        + sin((p.x + p.y) * 4.66 + t * 2.67 + ph) + sin(length(p) * 15.18 - t * 2.67 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.78), cos(time * 0.57)) * 0.23;
	float an = atan(p.y, p.x) + time * 0.73;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.05 / 3.1415927, 1.36 / r - time * 1.92);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.33 + time * 0.36);
	col *= clamp(r * 1.33, 0.0, 1.0);
	col = mod(col * 2.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
