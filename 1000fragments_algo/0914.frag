uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.20;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.56; kp = rot2(0.88) * kp; kp *= 1.37; }
    v = sin(kp.y * 1.35 - t * 2.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.59;
	p += vec2(sin((time * 0.71) * 0.45), cos((time * 0.71) * 0.83)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.75 / 3.1415927, 0.85 / r + (time * 0.71) * 1.96);
	float d = field(tv, (time * 0.71), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.08, 0.09), vec3(0.73, 0.72, 0.83), cc);
	col *= clamp(r * 2.23, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.958, 0.995, 0.957) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
