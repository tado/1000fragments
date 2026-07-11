uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 7.66 * sin(t * 1.00) + t * 5.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.77;
	p *= 0.71;
	p += vec2(sin((time * 0.76) * 0.77), cos((time * 0.76) * 1.21)) * 0.26;
	float an = atan(p.y, p.x) + (time * 0.76) * -0.72;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.29 / 3.1415927, 1.31 / r + (time * 0.76) * 2.91);
	tv.x += tv.y * 0.18;
	float d = field(tv, (time * 0.76), 0.0);
	vec3 col = vec3(0.40, 0.56, 0.43) * (0.05 / (abs((d)) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.85, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.76)) * 100.0) - 0.5) * 0.06;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.967, 0.999, 0.921) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
