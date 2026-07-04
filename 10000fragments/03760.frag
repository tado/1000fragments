uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.64);
    float gsh = hash21(vec2(grow, floor(t * 6.02))) - 0.5;
    float gx = p.x + gsh * 0.50;
    v = sin(gx * 15.30 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.92));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.82), cos(time * 0.82)) * 0.06;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.93 / 3.1415927, 1.02 / r - time * 1.20);
	tv.x += tv.y * 0.46;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.87, 0.22, 0.63) * (0.08 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.94, 0.0, 1.0);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 2.62 + time * 15.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
