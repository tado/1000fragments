uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.49 + t * 0.71 + ph) + sin(p.y * 3.67 - t * 0.71 + ph)
        + sin((p.x + p.y) * 10.38 + t * 0.71 + ph) + sin(length(p) * 7.22 - t * 0.71 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 0.57)) * 0.17;
	float an = atan(p.y, p.x) + time * -0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.77 / 3.1415927, 0.69 / r + time * 2.90);
	tv.x += tv.y * 0.43;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.06 + time * 0.93);
	col *= clamp(r * 2.37, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
