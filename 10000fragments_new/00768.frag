uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.27);
    float gsh = hash21(vec2(grow, floor(t * 7.21))) - 0.5;
    float gx = p.x + gsh * 0.75;
    v = sin(gx * 9.11 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.81));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.35 / 3.1415927, 1.11 / r - time * 1.83);
	tv.x += tv.y * 0.46;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.60, 1.10, 0.88) + vec3(0.19, 0.09, 0.16);
	col *= clamp(r * 2.98, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
