uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.58 + t * 2.20 + ph) + sin(p.y * 6.43 - t * 1.80 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.98), cos(time * 1.08)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.29 / 3.1415927, 1.09 / r - time * 1.53);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.03, vec3(0.46, 0.51, 0.40), vec3(0.36, 0.49, 0.37), vec3(1.20, 0.74, 1.08), vec3(0.82, 0.30, 0.35));
	col *= clamp(r * 3.00, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
