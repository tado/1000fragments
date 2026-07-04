uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 4.35 * sin(t * 0.96) + t * 5.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 0.80)) * 0.11;
	float an = atan(p.y, p.x) + time * -0.51;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.59 / 3.1415927, 0.37 / r - time * 2.55);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.76, 1.29, 1.35) + vec3(0.22, 0.11, 0.05);
	col *= clamp(r * 2.88, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
