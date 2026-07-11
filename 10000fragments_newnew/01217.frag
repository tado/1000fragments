uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.17;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.82) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 2.81) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = sin(p * 1.79 + time * 1.66) * 0.75;
	p.x += sin(p.y * 4.15 + time * 1.62) * 0.20;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.76, 0.58, 0.16) * (0.20 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
