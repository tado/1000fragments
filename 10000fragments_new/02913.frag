uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.88, t * 0.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.94, 0.57, 0.93) * (0.06 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = mod(col * 2.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
