uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.39 + t * 3.66 + ph) + sin(p.y * 4.82 - t * 3.66 + ph)
        + sin((p.x + p.y) * 5.75 + t * 3.66 + ph) + sin(length(p) * 10.69 - t * 3.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.50), cos(time * 0.90)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.80 / 3.1415927, 1.42 / r + time * 0.79);
	tv.x += tv.y * 0.10;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.42 + time * 0.02);
	col *= clamp(r * 1.14, 0.0, 1.0);
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
