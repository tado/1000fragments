uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.73 + t * 0.63) - 0.5) * 2.0;
    v = sin((p.y * 4.65 + zx * 0.58 + t * 1.35) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.75, 0.19, 0.97) * (0.15 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
