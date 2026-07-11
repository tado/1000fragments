uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.39 - t * 3.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.96, 0.62, 0.95) * (0.07 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = mod(col * 2.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
