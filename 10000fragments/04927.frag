uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 5.73 * sin(t * 0.82) + t * 2.45 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.28), cos(time * 1.20)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.27 / 3.1415927, 0.67 / r + time * 1.30);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.02, 0.07), vec3(0.68, 0.57, 0.78), cc);
	col *= clamp(r * 2.35, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
