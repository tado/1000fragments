uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.44 + t * 3.04 + ph) + sin(p.y * 14.06 - t * 1.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.22 / 3.1415927, 0.91 / r + time * 1.88);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.03, vec3(0.53, 0.56, 0.47), vec3(0.33, 0.33, 0.46), vec3(1.26, 1.17, 1.10), vec3(0.14, 0.57, 0.82));
	col *= clamp(r * 1.99, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
