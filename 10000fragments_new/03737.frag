uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.10 + sin(p.y * 1.19 + t * 4.01) * 2.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.47 / 3.1415927, 0.75 / r - time * 2.20);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.46 + time * 0.17, vec3(0.42, 0.41, 0.40), vec3(0.37, 0.34, 0.35), vec3(0.79, 1.00, 1.02), vec3(0.87, 0.60, 0.37));
	col *= clamp(r * 2.78, 0.0, 1.0);
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 2.52 + time * 15.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
