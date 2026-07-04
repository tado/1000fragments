uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.46 + t * 2.72 + ph) + sin(p.y * 15.90 - t * 4.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	p = (floor(p * 21.7) + 0.5) / 21.7;
	p = sin(p * 1.85 + time * 1.73) * 1.45;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.26, 0.38, 0.88) * (0.06 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
