uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.18; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 25.33 - t * 0.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.32; p = rot2(0.79) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.39, 0.97, 0.27) * (0.15 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 2.72 + time * 14.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
