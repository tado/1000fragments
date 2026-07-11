uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.31 + t * 4.11 + ph) + sin(p.y * 13.24 - t * 4.62 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.30 * fr * fr; }
	p *= 2.50;
	p = fract(p * 1.50) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.24, 0.13, 0.07), vec3(0.62, 0.86, 0.92), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
