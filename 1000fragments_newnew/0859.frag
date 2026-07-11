uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.23) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 3.25 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.88; }
	float d = field(p, (time * 0.55), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.53, 0.52, 0.58) + vec3(0.05, 0.05, 0.09);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.55)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 1.010, 1.018) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
