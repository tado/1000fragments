uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 34.34 - t * 4.36 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 26.70 - t * 6.58 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.76), cos(time * 0.75)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.70 / 3.1415927, 0.87 / r + time * 1.38);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.01, vec3(0.50, 0.48, 0.42), vec3(0.41, 0.47, 0.37), vec3(1.05, 1.02, 0.85), vec3(0.86, 0.97, 0.41));
	col *= clamp(r * 2.29, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
