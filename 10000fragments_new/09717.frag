uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.18 + t * 2.37 + ph) + sin(p.y * 6.64 - t * 2.62 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.35), cos(time * 0.69)) * 0.28;
	float an = atan(p.y, p.x) + time * 0.43;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.27 / 3.1415927, 0.76 / r + time * 1.50);
	tv.x += tv.y * 0.34;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.58, 0.16, 0.99) * (0.20 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.01, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
