uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.18 + t * 4.90 + ph) + sin(p.y * 13.47 - t * 4.90 + ph)
        + sin((p.x + p.y) * 3.71 + t * 4.90 + ph) + sin(length(p) * 16.57 - t * 4.90 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.04), cos(time * 0.79)) * 0.20;
	float an = atan(p.y, p.x) + time * -0.76;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.27 / 3.1415927, 0.46 / r - time * 2.01);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.63 + time * 0.35);
	col *= clamp(r * 1.05, 0.0, 1.0);
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
