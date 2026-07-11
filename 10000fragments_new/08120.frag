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
    v = sin(qa * 3.0 + qr * 5.73 * sin(t * 0.98) + t * 3.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.66 / 3.1415927, 1.45 / r + time * 2.37);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.37, vec3(0.45, 0.53, 0.42), vec3(0.45, 0.37, 0.43), vec3(0.92, 0.87, 0.79), vec3(0.39, 0.80, 0.13));
	col *= clamp(r * 1.21, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
