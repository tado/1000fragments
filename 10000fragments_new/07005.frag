uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.69 + t * 0.73 + ph) + sin(p.y * 17.43 - t * 5.71 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.30), cos(time * 0.75)) * 0.09;
	float an = atan(p.y, p.x) + time * -0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.16 / 3.1415927, 1.06 / r + time * 2.92);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.10, 0.03), vec3(0.62, 0.74, 0.42), cc);
	col *= clamp(r * 2.61, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
