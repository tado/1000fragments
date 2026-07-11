uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.61);
    float gsh = hash21(vec2(grow, floor(t * 2.14))) - 0.5;
    float gx = p.x + gsh * 0.31;
    v = sin(gx * 13.73 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.20));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.01), cos(time * 0.86)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.05 / 3.1415927, 1.39 / r + time * 2.52);
	tv.x += tv.y * 0.10;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.88, 0.45, 0.42) * (0.14 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.20, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
