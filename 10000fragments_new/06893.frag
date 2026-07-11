uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 3.71 * sin(t * 1.36) + t * 1.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.70), cos(time * 1.44)) * 0.13;
	float an = atan(p.y, p.x) + time * -0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.86 / 3.1415927, 0.92 / r - time * 1.70);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.44 + time * 0.05);
	col *= clamp(r * 2.15, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.72 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
