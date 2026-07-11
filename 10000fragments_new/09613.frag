uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.45 + t * 2.67 + ph) + sin(p.y * 4.29 - t * 2.67 + ph)
        + sin((p.x + p.y) * 3.51 + t * 2.67 + ph) + sin(length(p) * 17.76 - t * 2.67 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.34), cos(time * 0.76)) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.38 / 3.1415927, 1.42 / r + time * 2.01);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.27, 0.27), vec3(0.63, 0.98, 0.77), cc);
	col *= clamp(r * 2.31, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
