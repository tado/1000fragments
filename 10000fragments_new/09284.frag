uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 2.08 * sin(t * 1.40) + t * 4.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.83), cos(time * 0.98)) * 0.20;
	float an = atan(p.y, p.x) + time * -0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.99 / 3.1415927, 0.86 / r - time * 2.20);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.83 + time * 0.80);
	col *= clamp(r * 1.01, 0.0, 1.0);
	col = fract(col * 1.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
