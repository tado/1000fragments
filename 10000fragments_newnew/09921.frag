uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.93);
    float gsh = hash21(vec2(grow, floor(t * 2.46))) - 0.5;
    float gx = p.x + gsh * 0.54;
    v = sin(gx * 7.10 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.73));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.30), cos(time * 1.04)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.39 / 3.1415927, 0.34 / r + time * 0.68);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.82, 1.25, 1.25) + vec3(0.18, 0.20, 0.08);
	col *= clamp(r * 2.50, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
