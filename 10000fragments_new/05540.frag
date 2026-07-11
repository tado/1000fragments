uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.40);
    float gsh = hash21(vec2(grow, floor(t * 4.09))) - 0.5;
    float gx = p.x + gsh * 1.04;
    v = sin(gx * 15.51 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.21));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.28 / 3.1415927, 0.38 / r + time * 1.58);
	tv.x += tv.y * 0.26;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.34, 0.41), vec3(0.56, 0.67, 0.92), cc);
	col *= clamp(r * 2.13, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
