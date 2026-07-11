uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.26 + t * 5.34 + ph) + sin(p.y * 5.38 - t * 1.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	p = fract(p * 1.91) - 0.5;
	p = abs(p) - 0.35;
	p *= 2.36;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.55, 1.20, 0.62) + vec3(0.06, 0.11, 0.11);
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
