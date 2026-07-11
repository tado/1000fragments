uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.07);
    float gsh = hash21(vec2(grow, floor(t * 7.33))) - 0.5;
    float gx = p.x + gsh * 0.48;
    v = sin(gx * 11.98 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.84));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.65 / 3.1415927, 0.46 / r + time * 1.39);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.49 + time * 0.22);
	col *= clamp(r * 1.75, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
