uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.27 * jf)) * 0.72;
        xs += sin(length(p - im) * 116.19 - t * 11.14 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 7.9) + 0.5) / 7.9;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.28; p = rot2(1.81) * p; }
	p = rot2(length(p) * -2.06 + (time * 0.67) * 1.26) * p;
	float d = field(p, (time * 0.67), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.76, 0.61, 0.74) + vec3(0.07, 0.03, 0.09);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.969, 1.014, 0.932) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
