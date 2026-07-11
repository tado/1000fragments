uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.62) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 1.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.20, vec3(0.54, 0.53, 0.41), vec3(0.48, 0.47, 0.49), vec3(1.15, 1.08, 1.04), vec3(0.61, 0.21, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
