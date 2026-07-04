uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.21);
    float gsh = hash21(vec2(grow, floor(t * 7.86))) - 0.5;
    float gx = p.x + gsh * 0.68;
    v = sin(gx * 19.41 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.02));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.04 / 3.1415927, 0.96 / r - time * 0.99);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.17, 0.24), vec3(0.89, 0.99, 0.87), cc);
	col *= clamp(r * 1.09, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
