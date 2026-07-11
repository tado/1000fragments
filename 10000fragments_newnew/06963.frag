uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.14;
    v = 0.5 * (sin(6.0 * cp.x + t * 2.33) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.10) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.78, 0.27, 0.95) * (0.14 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
