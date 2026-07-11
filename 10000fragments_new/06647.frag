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
    v = sin(qa * 11.0 + qr * 2.45 * sin(t * 1.25) + t * 3.72 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.15;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.83 / 3.1415927, 0.93 / r - time * 1.60);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.11, vec3(0.54, 0.42, 0.53), vec3(0.47, 0.36, 0.50), vec3(0.71, 1.31, 0.89), vec3(0.57, 0.58, 0.12));
	col *= clamp(r * 2.51, 0.0, 1.0);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 1.59 + time * 9.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
