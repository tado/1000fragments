uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.31);
    float gsh = hash21(vec2(grow, floor(t * 2.11))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 13.67 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.20));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	p = rot2(length(p) * 2.46 + time * 1.30) * p;
	p += vec2(0.96, 0.25) * sin(length(p) * 5.94 - time * 1.26) * 0.18;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.44, 0.81, 0.86) * (0.06 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
