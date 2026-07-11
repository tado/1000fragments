uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.94);
    float gsh = hash21(vec2(grow, floor(t * 2.16))) - 0.5;
    float gx = p.x + gsh * 1.01;
    v = sin(gx * 12.20 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.96));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.79;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.63 / 3.1415927, 0.86 / r + time * 1.59);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.07, 0.11), vec3(0.60, 0.92, 0.73), cc);
	col *= clamp(r * 1.23, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
