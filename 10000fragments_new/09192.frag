uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 5.30 * sin(t * 0.53) + t * 1.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.35), cos(time * 1.45)) * 0.18;
	float an = atan(p.y, p.x) + time * -0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.92 / 3.1415927, 1.21 / r - time * 2.65);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.95 + time * 0.34);
	col *= clamp(r * 2.67, 0.0, 1.0);
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
