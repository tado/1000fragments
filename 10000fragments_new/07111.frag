uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.78 + t * 3.49 + ph) + sin(p.y * 8.21 - t * 5.22 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.83), cos(time * 0.53)) * 0.18;
	float an = atan(p.y, p.x) + time * 0.39;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.88 / 3.1415927, 0.36 / r + time * 1.57);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.14, vec3(0.46, 0.46, 0.53), vec3(0.45, 0.37, 0.31), vec3(1.03, 0.99, 0.74), vec3(0.92, 0.38, 0.36));
	col *= clamp(r * 1.88, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
