uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 7.48 * sin(t * 1.47) + t * 2.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.02), cos(time * 0.60)) * 0.11;
	float an = atan(p.y, p.x) + time * 0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.84 / 3.1415927, 1.09 / r - time * 2.23);
	tv.x += tv.y * 0.23;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.84 + time * 0.59);
	col *= clamp(r * 2.13, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
