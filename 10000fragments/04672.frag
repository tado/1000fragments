uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 13.80 - t * 5.80 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 35.19 - t * 5.80 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(2.37) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.01);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
