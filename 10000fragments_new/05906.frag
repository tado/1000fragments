uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.51 + t * 5.87 + ph) + sin(p.y * 5.50 - t * 5.94 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.13, 1.59, 1.12) + vec3(0.04, 0.17, 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
