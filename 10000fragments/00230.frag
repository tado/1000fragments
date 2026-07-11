uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.98 + t * 1.87 + ph) + sin(p.y * 9.21 - t * 3.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.75, 1.41, 1.02) + vec3(0.11, 0.30, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
