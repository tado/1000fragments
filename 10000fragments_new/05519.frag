uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.45 + t * 1.99 + ph) + sin(p.y * 3.01 - t * 1.99 + ph)
        + sin((p.x + p.y) * 2.22 + t * 1.99 + ph) + sin(length(p) * 11.22 - t * 1.99 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.04), cos(time * 0.49)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.02 / 3.1415927, 1.38 / r + time * 2.79);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.87 + time * 0.44);
	col *= clamp(r * 1.34, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.77 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
