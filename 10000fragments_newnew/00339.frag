uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.58);
    float gsh = hash21(vec2(grow, floor(t * 7.48))) - 0.5;
    float gx = p.x + gsh * 1.16;
    v = sin(gx * 13.25 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.31));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.19), cos(time * 0.98)) * 0.06;
	float an = atan(p.y, p.x) + time * -0.65;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.84 / 3.1415927, 1.49 / r + time * 1.49);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.04 + time * 0.18);
	col *= clamp(r * 1.80, 0.0, 1.0);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 1.28 + time * 6.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
