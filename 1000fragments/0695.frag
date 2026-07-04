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
    v = sin(qa * 6.0 + qr * 7.43 * sin(t * 0.42) + t * 1.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.86 / 3.1415927, 0.61 / r - time * 2.68);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.40, vec3(0.54, 0.44, 0.42), vec3(0.45, 0.32, 0.35), vec3(0.82, 0.89, 0.85), vec3(0.67, 0.08, 0.54));
	col *= clamp(r * 2.34, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
