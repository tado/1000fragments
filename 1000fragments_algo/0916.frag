uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 22.43 - t * 2.13 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 20.26 - t * 4.04 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y += sin(p.x * 2.07 + (time * 0.76) * 0.65) * 0.11;
	p += vec2(sin((time * 0.76) * 1.49), cos((time * 0.76) * 1.24)) * 0.27;
	float an = atan(p.y, p.x) + (time * 0.76) * 0.54;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.49 / 3.1415927, 0.42 / r + (time * 0.76) * 1.96);
	tv.x += tv.y * 0.47;
	float d = field(tv, (time * 0.76), 0.0);
	vec3 col = vec3(0.46, 0.35, 0.38) * (0.09 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.82, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 0.992, 0.998) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
