uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.20 + t * 4.97 + ph) + sin(p.y * 7.77 - t * 4.60 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.43 / 3.1415927, 1.09 / r + time * 2.10);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.43, 0.28, 0.90) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.87, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
