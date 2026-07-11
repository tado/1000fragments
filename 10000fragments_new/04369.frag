uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.60 + t * 1.80 + ph) + sin(p.y * 5.52 - t * 4.36 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 0.53, 1.42) + vec3(0.28, 0.01, 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
