uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.12) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 2.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.02, vec3(0.55, 0.56, 0.49), vec3(0.35, 0.47, 0.49), vec3(0.87, 1.09, 0.92), vec3(0.53, 0.26, 0.56));
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
