uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.47 + t * 0.56 + ph) + sin(p.y * 9.85 - t * 3.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	p *= 2.27;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.87, 0.29, 0.88) * (0.06 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
