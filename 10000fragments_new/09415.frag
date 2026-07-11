uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 7.55 * sin(t * 1.18) + t * 5.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.44), cos(time * 0.83)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.89 / 3.1415927, 0.65 / r + time * 1.39);
	tv.x += tv.y * 0.27;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.08, 0.10), vec3(0.72, 0.60, 0.58), cc);
	col *= clamp(r * 1.05, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
