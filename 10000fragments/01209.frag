uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.97 + t * 0.81 + ph) + sin(p.y * 11.30 - t * 0.81 + ph)
        + sin((p.x + p.y) * 3.01 + t * 0.81 + ph) + sin(length(p) * 12.47 - t * 0.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.96 + time * 0.00);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
