uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.37 + t * 0.56 + ph) + sin(p.y * 15.55 - t * 5.26 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.26), cos(time * 0.53)) * 0.27;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.35 / 3.1415927, 1.04 / r - time * 0.61);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.33, vec3(0.46, 0.57, 0.49), vec3(0.44, 0.45, 0.36), vec3(1.07, 1.10, 0.88), vec3(0.13, 0.40, 0.37));
	col *= clamp(r * 2.03, 0.0, 1.0);
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 2.80 + time * 4.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
