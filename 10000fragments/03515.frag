uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.39) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 0.83 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 0.59, 1.09) + vec3(0.26, 0.17, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
