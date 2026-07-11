uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.63, t * 0.86 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.69, 0.68, 0.23) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 2.68 + time * 4.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
