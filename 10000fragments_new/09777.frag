uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.87);
    float gsh = hash21(vec2(grow, floor(t * 9.60))) - 0.5;
    float gx = p.x + gsh * 0.41;
    v = sin(gx * 9.40 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.48));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	p = rot2(1.47) * p;
	p += vec2(-0.87, -0.62) * sin(length(p) * 4.38 - time * 1.35) * 0.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.78));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
