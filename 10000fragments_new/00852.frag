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
    v = sin(qa * 11.0 + qr * 3.84 * sin(t * 0.76) + t * 5.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.26), cos(time * 0.63)) * 0.22;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.94 / 3.1415927, 1.05 / r - time * 1.87);
	tv.x += tv.y * 0.29;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.07, vec3(0.56, 0.48, 0.46), vec3(0.35, 0.41, 0.44), vec3(1.27, 0.78, 1.00), vec3(0.12, 0.76, 0.93));
	col *= clamp(r * 2.97, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
