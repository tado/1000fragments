uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.93 + jf * 4.0), cos(t * 0.58 * jf)) * 0.59;
        xs += sin(length(p - im) * 101.68 - t * 4.85 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	p += vec2(-0.23, -0.02) * sin(length(p) * 3.74 - time * 1.90) * 0.38;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.57; p = rot2(0.40) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.36, 0.23), vec3(0.78, 0.67, 0.89), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
