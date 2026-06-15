uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.42) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 3.04 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.21, vec3(0.58, 0.53, 0.52), vec3(0.45, 0.41, 0.45), vec3(0.92, 0.78, 1.05), vec3(0.08, 0.51, 0.85));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
