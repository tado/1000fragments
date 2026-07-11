uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.69 + t * 2.15 + ph) + sin(p.y * 5.64 - t * 2.15 + ph)
        + sin((p.x + p.y) * 7.80 + t * 2.15 + ph) + sin(length(p) * 15.20 - t * 2.15 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.71 / 3.1415927, 0.63 / r - time * 1.59);
	tv.x += tv.y * 0.10;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.73 + time * 0.63);
	col *= clamp(r * 1.87, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
