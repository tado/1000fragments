uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.51 + sin(p.y * 5.86 + t * 1.26) * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.16), cos(time * 0.91)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.13 / 3.1415927, 0.78 / r + time * 0.74);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.18, 0.46), vec3(0.75, 0.59, 0.47), cc);
	col *= clamp(r * 2.61, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
