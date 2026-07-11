uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.16 + sr * 5.78 - t * 0.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.87 / 3.1415927, 0.91 / r - time * 0.94);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.11, vec3(0.57, 0.45, 0.53), vec3(0.47, 0.50, 0.49), vec3(0.97, 0.91, 1.25), vec3(0.02, 0.53, 0.73));
	col *= clamp(r * 1.25, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
