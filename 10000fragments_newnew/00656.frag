uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 6.09 * sin(t * 1.15) + t * 5.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.98), cos(time * 1.47)) * 0.09;
	float an = atan(p.y, p.x) + time * -0.53;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.17 / 3.1415927, 1.40 / r + time * 2.73);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.33, vec3(0.41, 0.54, 0.44), vec3(0.34, 0.32, 0.33), vec3(1.28, 0.73, 1.15), vec3(0.35, 0.51, 0.75));
	col *= clamp(r * 1.43, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
