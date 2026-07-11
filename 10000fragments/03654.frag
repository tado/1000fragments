uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.10) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 2.46 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	p = abs(p) - 0.67;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.16, vec3(0.40, 0.57, 0.44), vec3(0.47, 0.33, 0.33), vec3(0.83, 1.33, 0.82), vec3(0.82, 0.29, 0.93));
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
