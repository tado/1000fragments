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
    v = sin(qa * 4.0 + qr * 4.07 * sin(t * 0.94) + t * 2.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 0.75)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.10 / 3.1415927, 0.95 / r - time * 1.47);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.10, vec3(0.52, 0.53, 0.44), vec3(0.41, 0.31, 0.41), vec3(0.75, 1.33, 1.03), vec3(0.32, 0.81, 0.11));
	col *= clamp(r * 1.75, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
