uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.76) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 2.79 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.54 + sr * 23.21 - t * 4.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = d1 * d2;
	vec3 col = palette(d * 1.15 + time * 0.27, vec3(0.47, 0.53, 0.41), vec3(0.49, 0.45, 0.35), vec3(1.20, 1.39, 0.94), vec3(0.97, 0.58, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
