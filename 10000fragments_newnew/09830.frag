uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.72) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.68 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	p = (floor(p * 23.8) + 0.5) / 23.8;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.76; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.72, 0.54, 1.03) + vec3(0.27, 0.02, 0.22);
	col = mod(col * 1.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
