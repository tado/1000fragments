uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.23 + sin(p.y * 1.20 + t * 3.65) * 1.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.53) * 1.47), cos((time * 0.53) * 0.49)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.31 / 3.1415927, 1.44 / r + (time * 0.53) * 0.57);
	tv.x += tv.y * 0.15;
	float d = field(tv, (time * 0.53), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.05, 0.05), vec3(0.53, 0.68, 0.71), cc);
	col *= clamp(r * 2.85, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.972, 1.005, 0.942) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
