uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.23 + t * 5.28 + ph) + sin(p.y * 12.19 - t * 0.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.32, 0.68, 1.42) + vec3(0.26, 0.25, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
