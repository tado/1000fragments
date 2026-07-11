uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.14);
    float gsh = hash21(vec2(grow, floor(t * 4.68))) - 0.5;
    float gx = p.x + gsh * 0.82;
    v = sin(gx * 11.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.76));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.29 / 3.1415927, 1.19 / r - time * 2.02);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.99 + time * 0.82);
	col *= clamp(r * 1.40, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
