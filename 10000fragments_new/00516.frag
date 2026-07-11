uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.88 + t * 1.29 + ph) + sin(p.y * 8.58 - t * 1.29 + ph)
        + sin((p.x + p.y) * 5.00 + t * 1.29 + ph) + sin(length(p) * 14.70 - t * 1.29 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.46), cos(time * 0.69)) * 0.27;
	float an = atan(p.y, p.x) + time * -0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.73 / 3.1415927, 0.54 / r + time * 2.81);
	tv.x += tv.y * 0.37;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.02 + time * 0.01);
	col *= clamp(r * 1.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
