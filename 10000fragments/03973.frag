uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.70 + t * 5.13 + ph) + sin(p.y * 11.33 - t * 4.53 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.47), cos(time * 1.44)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.24 / 3.1415927, 1.32 / r + time * 2.32);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.58 + time * 0.83);
	col *= clamp(r * 1.66, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
