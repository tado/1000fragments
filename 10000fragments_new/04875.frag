uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.34);
    float gsh = hash21(vec2(grow, floor(t * 3.54))) - 0.5;
    float gx = p.x + gsh * 0.36;
    v = sin(gx * 7.42 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.29));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.70), cos(time * 1.35)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.10 / 3.1415927, 0.64 / r + time * 0.77);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.10, 0.37), vec3(0.95, 0.70, 0.62), cc);
	col *= clamp(r * 2.23, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
