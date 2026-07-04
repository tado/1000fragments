uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.81 + t * 3.76 + ph) + sin(p.y * 3.20 - t * 3.76 + ph)
        + sin((p.x + p.y) * 9.21 + t * 3.76 + ph) + sin(length(p) * 15.42 - t * 3.76 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 1.05)) * 0.22;
	float an = atan(p.y, p.x) + time * -0.70;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.93 / 3.1415927, 0.48 / r - time * 2.53);
	tv.x += tv.y * 0.40;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.03, vec3(0.53, 0.60, 0.45), vec3(0.30, 0.33, 0.35), vec3(1.04, 1.07, 0.78), vec3(0.49, 0.70, 0.56));
	col *= clamp(r * 2.41, 0.0, 1.0);
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
