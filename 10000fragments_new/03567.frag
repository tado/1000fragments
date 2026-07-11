uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.75);
    float gsh = hash21(vec2(grow, floor(t * 4.08))) - 0.5;
    float gx = p.x + gsh * 0.47;
    v = sin(gx * 17.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.78));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.58), cos(time * 1.35)) * 0.29;
	float an = atan(p.y, p.x) + time * -0.79;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 0.64 / r - time * 2.30);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.29);
	col *= clamp(r * 1.23, 0.0, 1.0);
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
