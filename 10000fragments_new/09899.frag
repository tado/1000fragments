uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.14 - t * 3.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.43), field(p, time, 0.85));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
