uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.38, t * 1.74 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.42), cos(time * 0.77)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.50;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 1.30 / r + time * 1.74);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.14, vec3(0.53, 0.41, 0.43), vec3(0.42, 0.33, 0.46), vec3(1.16, 0.95, 0.73), vec3(0.22, 0.97, 0.79));
	col *= clamp(r * 1.00, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
