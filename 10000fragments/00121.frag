uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.81 + t * 2.39 + ph) + sin(p.y * 6.76 - t * 1.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.35, 0.81, 1.48) + vec3(0.12, 0.01, 0.21);
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
