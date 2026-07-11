uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.71 + t * 3.78 + ph) + sin(p.y * 4.03 - t * 3.78 + ph)
        + sin((p.x + p.y) * 5.42 + t * 3.78 + ph) + sin(length(p) * 6.69 - t * 3.78 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 1.34)) * 0.07;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.10 / 3.1415927, 0.50 / r - time * 2.82);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.46, 0.41, 0.69) * (0.18 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.80, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
