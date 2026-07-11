uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.56);
    float gsh = hash21(vec2(grow, floor(t * 6.03))) - 0.5;
    float gx = p.x + gsh * 1.08;
    v = sin(gx * 14.14 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.64));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.99, 0.86, 0.98) * (0.09 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
