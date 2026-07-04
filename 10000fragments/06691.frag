uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.07 + t * 3.87 + ph) + sin(p.y * 7.11 - t * 3.87 + ph)
        + sin((p.x + p.y) * 5.98 + t * 3.87 + ph) + sin(length(p) * 5.28 - t * 3.87 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	p = (floor(p * 17.4) + 0.5) / 17.4;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.23 + time * 0.09);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
