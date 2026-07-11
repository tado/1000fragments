uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.09 + t * 1.79 + ph) + sin(p.y * 3.20 - t * 1.79 + ph)
        + sin((p.x + p.y) * 11.26 + t * 1.79 + ph) + sin(length(p) * 9.79 - t * 1.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.56) * 1.39), cos((time * 0.56) * 1.50)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.72 / 3.1415927, 1.42 / r + (time * 0.56) * 2.15);
	float d = field(tv, (time * 0.56), 0.0);
	vec3 col = vec3(0.48, 0.59, 0.60) * (0.11 / (abs((d)) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.66, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.63 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.055, 0.971, 0.930) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
