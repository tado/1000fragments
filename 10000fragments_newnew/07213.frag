uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.47;
    v = 0.5 * (sin(5.0 * cp.x + t * 2.62) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 1.81) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.60), cos(time * 0.79)) * 0.07;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.69 / 3.1415927, 1.04 / r - time * 0.56);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.05, vec3(0.47, 0.58, 0.59), vec3(0.44, 0.50, 0.38), vec3(1.01, 0.85, 1.25), vec3(0.89, 0.78, 0.41));
	col *= clamp(r * 1.14, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
