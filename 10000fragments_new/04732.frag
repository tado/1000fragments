uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.60, 0.0)) * 31.34 - t * 4.61 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 39.21 - t * 2.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.47), cos(time * 1.24)) * 0.15;
	float an = atan(p.y, p.x) + time * 0.78;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 1.30 / r + time * 2.68);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.34, vec3(0.54, 0.53, 0.58), vec3(0.42, 0.42, 0.33), vec3(0.81, 0.70, 0.79), vec3(0.48, 0.30, 0.40));
	col *= clamp(r * 2.70, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.72 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
