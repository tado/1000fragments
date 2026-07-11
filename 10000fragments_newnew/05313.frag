uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.10 - t * 1.77;
    v = sin(floor(lv * 4.2) / 4.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.21, 1.02, 0.89) + vec3(0.05, 0.10, 0.19);
	col *= 0.83 + 0.16 * sin(gl_FragCoord.y * 1.05 + time * 6.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
