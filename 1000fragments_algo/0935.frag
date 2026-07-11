uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.20);
    float gsh = hash21(vec2(grow, floor(t * 2.98))) - 0.5;
    float gx = p.x + gsh * 1.18;
    v = sin(gx * 10.93 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.89));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.64 + (time * 0.76) * 0.78) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.45 / 3.1415927, 1.23 / r - (time * 0.76) * 1.45);
	float d = field(tv, (time * 0.76), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.05, 0.08), vec3(0.57, 0.60, 0.56), cc);
	col *= clamp(r * 2.23, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 1.006, 0.914) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
