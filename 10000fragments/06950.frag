uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 3.06 * sin(t * 1.30) + t * 4.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 0.70)) * 0.22;
	float an = atan(p.y, p.x) + time * -0.24;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.11 / 3.1415927, 0.61 / r - time * 2.69);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.57, 0.69, 0.85) * (0.14 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.18, 0.0, 1.0);
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
