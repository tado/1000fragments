uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 33.69 - t * 3.97 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 39.12 - t * 1.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.67), cos(time * 0.71)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.92 / 3.1415927, 1.37 / r + time * 0.51);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.14, vec3(0.41, 0.51, 0.56), vec3(0.43, 0.30, 0.42), vec3(1.13, 1.36, 1.02), vec3(0.69, 1.00, 0.36));
	col *= clamp(r * 2.71, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
