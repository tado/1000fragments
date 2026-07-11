uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.55; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 16.84 - t * 3.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 6.06 + time * 3.99) * 0.28;
	p *= 1.79;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.58; p = rot2(1.97) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.19, vec3(0.59, 0.56, 0.45), vec3(0.44, 0.37, 0.45), vec3(0.77, 0.96, 1.08), vec3(0.15, 0.70, 0.07));
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
