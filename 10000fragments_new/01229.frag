uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.76);
    float gsh = hash21(vec2(grow, floor(t * 8.52))) - 0.5;
    float gx = p.x + gsh * 0.66;
    v = sin(gx * 15.62 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.91));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.79), cos(time * 0.93)) * 0.29;
	float an = atan(p.y, p.x) + time * 0.27;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.48 / 3.1415927, 1.16 / r + time * 1.62);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.01 + time * 0.21);
	col *= clamp(r * 1.11, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
