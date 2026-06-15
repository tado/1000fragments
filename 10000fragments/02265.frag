uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.59 - t * 7.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.54, 0.35) * sin(length(p) * 5.78 - time * 1.15) * 0.25;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	p = fract(p * 1.27) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.45, 0.27), vec3(0.67, 0.67, 0.73), d);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
