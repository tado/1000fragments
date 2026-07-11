uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.64 + t * 4.18 + ph) + sin(p.y * 17.74 - t * 1.08 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.22));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
