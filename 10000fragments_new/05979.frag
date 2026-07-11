uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.47 + sin(p.y * 2.15 + t * 3.80) * 3.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.96, 0.90, 0.36) * (0.18 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.83 + 0.10 * sin(gl_FragCoord.y * 2.21 + time * 15.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
