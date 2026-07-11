uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.28 * cos(sa * 4.0 + t * 0.86 + ph);
    v = sin((sr - petal) * 18.54);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.78) * 0.70), cos((time * 0.78) * 0.83)) * 0.12;
	float an = atan(p.y, p.x) + (time * 0.78) * 0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.71 / 3.1415927, 0.57 / r + (time * 0.78) * 2.92);
	tv.x += tv.y * 0.13;
	float d = field(tv, (time * 0.78), 0.0);
	vec3 col = vec3(0.48, 0.40, 0.53) * (0.11 / (abs((d)) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.34, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.971, 0.937) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
