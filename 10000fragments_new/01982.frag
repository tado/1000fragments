uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 19.97 - t * 3.87 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 33.47 - t * 7.52 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.89 / 3.1415927, 0.63 / r - time * 1.15);
	tv.x += tv.y * 0.12;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.32, vec3(0.41, 0.41, 0.46), vec3(0.44, 0.35, 0.49), vec3(1.11, 0.81, 0.70), vec3(0.70, 0.56, 0.74));
	col *= clamp(r * 1.06, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
