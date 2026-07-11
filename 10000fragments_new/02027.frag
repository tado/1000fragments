uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 2.86 * sin(t * 0.41) + t * 5.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.25), cos(time * 0.47)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.63 / 3.1415927, 0.50 / r + time * 2.26);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.19 + time * 0.91);
	col *= clamp(r * 2.22, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
