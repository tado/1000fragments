uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.56) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.76, 0.99, 0.80) + vec3(0.30, 0.20, 0.09);
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
