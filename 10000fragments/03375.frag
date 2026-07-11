uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.94) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 1.74 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.20, 0.08), vec3(0.62, 0.66, 0.42), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
