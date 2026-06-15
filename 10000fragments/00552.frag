uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.76 + t * 0.98 + ph) + sin(p.y * 13.56 - t * 0.98 + ph)
        + sin((p.x + p.y) * 11.32 + t * 0.98 + ph) + sin(length(p) * 14.37 - t * 0.98 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.37 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
