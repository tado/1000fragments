uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.91);
    float gsh = hash21(vec2(grow, floor(t * 3.35))) - 0.5;
    float gx = p.x + gsh * 0.77;
    v = sin(gx * 17.97 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.65));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.34;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.57 + time * 0.14);
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
