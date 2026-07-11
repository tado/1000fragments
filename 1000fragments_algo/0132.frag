uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.62);
    float gsh = hash21(vec2(grow, floor(t * 8.83))) - 0.5;
    float gx = p.x + gsh * 1.20;
    v = sin(gx * 12.68 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.17));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	p = rot2((time * 0.84) * 0.84) * p;
	float d = field(p, (time * 0.84), 0.0);
	vec3 col = vec3(0.77, 0.60, 0.67) * (0.09 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.929, 0.967, 1.037) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
