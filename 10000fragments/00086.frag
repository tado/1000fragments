uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.84 + t * 2.74 + ph) + sin(p.y * 16.86 - t * 5.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	p += vec2(0.37, -0.20) * sin(length(p) * 4.68 - time * 1.44) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.74 + time * 0.29);
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
