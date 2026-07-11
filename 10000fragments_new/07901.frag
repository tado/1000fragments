uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.43);
    float gsh = hash21(vec2(grow, floor(t * 5.96))) - 0.5;
    float gx = p.x + gsh * 0.60;
    v = sin(gx * 9.28 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.54));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
