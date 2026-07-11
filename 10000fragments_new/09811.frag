uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.53);
    float gsh = hash21(vec2(grow, floor(t * 6.81))) - 0.5;
    float gx = p.x + gsh * 0.80;
    v = sin(gx * 10.39 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.65));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.99), cos(time * 0.47)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.91 / 3.1415927, 1.34 / r + time * 1.71);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.07 + time * 0.45);
	col *= clamp(r * 2.87, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.57 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
