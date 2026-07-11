uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.59 + sr * 9.46 - t * 3.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.03), cos(time * 0.71)) * 0.11;
	float an = atan(p.y, p.x) + time * 0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.91 / 3.1415927, 0.32 / r - time * 1.46);
	tv.x += tv.y * 0.41;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.26, 0.53), vec3(0.83, 0.87, 0.65), cc);
	col *= clamp(r * 2.15, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
