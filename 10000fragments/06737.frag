uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.79, t * 1.42 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.15), field(p, time, 2.29));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
