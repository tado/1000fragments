uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.42);
    float gsh = hash21(vec2(grow, floor(t * 7.13))) - 0.5;
    float gx = p.x + gsh * 0.48;
    v = sin(gx * 9.97 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.00));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 0.72)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.05 / 3.1415927, 0.74 / r - time * 2.07);
	tv.x += tv.y * 0.32;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.03, 0.16), vec3(0.84, 0.69, 0.70), cc);
	col *= clamp(r * 1.18, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.94 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
